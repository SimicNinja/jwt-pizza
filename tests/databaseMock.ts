import { expect } from 'playwright-test-coverage';
import type { Page } from '@playwright/test';
import { Role, type User } from '../src/service/pizzaService';

export async function setupUser(page: Page, user?: User) {
	await page.route('*/**/api/user/me', async (route) => {
		expect(route.request().method()).toBe('GET');
		await route.fulfill({ json: user });
	});
}

export async function setupMenu(page: Page) {
	await page.route('*/**/api/order/menu', async (route) => {
		const menuRes = [
			{
				id: 1,
				title: 'Veggie',
				image: 'pizza1.png',
				price: 0.0038,
				description: 'A garden of delight',
			},
			{
				id: 2,
				title: 'Pepperoni',
				image: 'pizza2.png',
				price: 0.0042,
				description: 'Spicy treat',
			},
		];
		expect(route.request().method()).toBe('GET');
		await route.fulfill({ json: menuRes });
	});
}

export async function franchiseList(page: Page) {
	await page.route(/\/api\/franchise(\?.*)?$/, async (route) => {
		const franchiseRes = {
			franchises: [
				{
					id: 2,
					name: 'LotaPizza',
					admins: [{ id: '3', name: 'Kai Chen', email: 'd@jwt.com' }],
					stores: [
						{ id: 4, name: 'Lehi' },
						{ id: 5, name: 'Springville' },
						{ id: 6, name: 'American Fork' },
					],
				},
				{ id: 3, name: 'PizzaCorp', stores: [{ id: 7, name: 'Spanish Fork' }] },
				{ id: 4, name: 'topSpot', stores: [] },
			],
		};
		expect(route.request().method()).toBe('GET');
		await route.fulfill({ json: franchiseRes });
	});
}

export async function setupOrder(page: Page) {
	await page.route('*/**/api/order', async (route) => {
		if (route.request().method() !== 'POST') {
			await route.continue();
			return;
		}
		const orderReq = route.request().postDataJSON();
		const orderRes = {
			order: { ...orderReq, id: 23 },
			jwt: 'eyJpYXQ',
		};
		await route.fulfill({ json: orderRes });
	});
}

export async function initGuestUser(page: Page) {
	let currentUser: User | undefined = undefined;
	const validUsers: Record<string, User> = {
		'd@jwt.com': {
			id: '3',
			name: 'Kai Chen',
			email: 'd@jwt.com',
			password: 'a',
			roles: [{ role: Role.Diner }],
		},
	};

	// Authorize login for the given user
	await page.route('*/**/api/auth', async (route) => {
		const method = route.request().method();
		
		// Handle login (PUT)
		if (method === 'PUT') {
			const loginReq = route.request().postDataJSON();
			const user = validUsers[loginReq.email];
			if (!user || user.password !== loginReq.password) {
				await route.fulfill({ status: 401, json: { error: 'Unauthorized' } });
				return;
			}
			currentUser = user;
			const loginRes = {
				user: { id: user.id, name: user.name, email: user.email, roles: user.roles },
				token: 'test-token-' + user.email,
			};
			await route.fulfill({ json: loginRes });
			return;
		}

		// Handle register (POST)
		if (method === 'POST') {
			const registerReq = route.request().postDataJSON();
			const newUser: User = {
				id: '999',
				name: registerReq.name,
				email: registerReq.email,
				roles: [{ role: Role.Diner }],
			};
			currentUser = newUser;
			const registerRes = {
				user: newUser,
				token: 'new-user-token',
			};
			await route.fulfill({ json: registerRes });
			return;
		}

		// Pass through other methods
		await route.continue();
	});

	// Return the currently logged in user
	await page.route('*/**/api/user/me', async (route) => {
		expect(route.request().method()).toBe('GET');
		await route.fulfill({ json: currentUser });
	});

	// A standard menu
	await setupMenu(page);
	
	// Standard franchises and stores
	await franchiseList(page);
	
	// Order a pizza
	await setupOrder(page);

	await page.goto('/');
	return { validUsers };
}

export async function initLoggedInDiner(page: Page) {
    let currentUser: User | undefined = {
        id: '3',
        name: 'Kai Chen',
        email: 'd@jwt.com',
        roles: [{ role: Role.Diner }],
    };

    const logoutInfo = { called: false };

    await page.addInitScript((token) => {
        localStorage.setItem('token', token);
    }, 'test-token');

    // Handle logout
    await page.route('*/**/api/auth', async (route) => {
        if (route.request().method() === 'DELETE') {
            logoutInfo.called = true;
            currentUser = undefined;
            await route.fulfill({ json: { message: 'Logged out' } });
            return;
        }
        await route.continue();
    });

    // Return the currently logged in user
    await page.route('*/**/api/user/me', async (route) => {
        expect(route.request().method()).toBe('GET');
        await route.fulfill({ json: currentUser });
    });

    await page.goto('/');
    return { user: currentUser, logoutInfo };
}