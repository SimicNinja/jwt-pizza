# Learning notes

## JWT Pizza code study and debugging

As part of `Deliverable ⓵ Development deployment: JWT Pizza`, start up the application and debug through the code until you understand how it works. During the learning process fill out the following required pieces of information in order to demonstrate that you have successfully completed the deliverable.

| User activity                                       | Frontend component | Backend endpoints | Database SQL |
| --------------------------------------------------- | ------------------ | ----------------- | ------------ |
| View home page                                      |home.jsx|N/A|N/A|
| Register new user<br/>(t@jwt.com, pw: test)         |register.jsx|[POST] /api/auth|`INSERT INTO user (name, email, password) VALUES (?, ?, ?)` <br/> `INSERT INTO userRole (userId, role, objectId) VALUES (?, ?, ?)`|
| Login new user<br/>(t@jwt.com, pw: test)            |login.jsx|[PUT] /api/auth|`SELECT * FROM user WHERE email=?`<br/>`SELECT * FROM userRole WHERE userId=?`(Only runs if provided email is in use)|
| Order pizza                                         |menu.jsx & payment.jsx|[POST] /api/order|`INSERT INTO dinerOrder (dinerId, franchiseId, storeId, date) VALUES (?, ?, ?, now())`<br/>`INSERT INTO orderItem (orderId, menuId, description, price) VALUES (?, ?, ?, ?)`(Runs for each pizza on the order)|
| Verify pizza                                        |delivery.jsx|N/A|N/A|
| View profile page                                   |dinerDashboard.jsx|N/A|N/A|
| View franchise<br/>(as diner)                       |franchiseDashboard.jsx|N/A|N/A|
| Logout                                              |logout.jsx|[DELETE] /api/auth|`DELETE FROM auth WHERE token=?`|
| View About page                                     |about.jsx|N/A|N/A|
| View History page                                   |history.jsx|N/A|N/A|
| Login as franchisee<br/>(f@jwt.com, pw: franchisee) |login.jsx|[PUT] /api/auth|`SELECT * FROM user WHERE email=?`<br/>`SELECT * FROM userRole WHERE userId=?`(Only runs if provided email is in use)|
| View franchise<br/>(as franchisee)                  |franchiseDashboard.jsx|[GET] /api/franchise/:userId|`SELECT objectId FROM userRole WHERE role='franchisee' AND userId=?`(Check franchisee status)<br/>`SELECT id, name FROM franchise WHERE id in (${franchiseIds.join(',')})`(Pull ids of owned franchises)<br/>(Repeat these 2 queries for each franchise id pulled)<br/>`SELECT u.id, u.name, u.email FROM userRole AS ur JOIN user AS u ON u.id=ur.userId WHERE ur.objectId=? AND ur.role='franchisee'`<br/>`SELECT s.id, s.name, COALESCE(SUM(oi.price), 0) AS totalRevenue FROM dinerOrder AS do JOIN orderItem AS oi ON do.id=oi.orderId RIGHT JOIN store AS s ON s.id=do.storeId WHERE s.franchiseId=? GROUP BY s.id`|
| Create a store                                      |createStore.jsx|[POST] /api/franchise/:franchiseId/store|`SELECT u.id, u.name, u.email FROM userRole AS ur JOIN user AS u ON u.id=ur.userId WHERE ur.objectId=? AND ur.role='franchisee'`<br/>`SELECT s.id, s.name, COALESCE(SUM(oi.price), 0) AS totalRevenue FROM dinerOrder AS do JOIN orderItem AS oi ON do.id=oi.orderId RIGHT JOIN store AS s ON s.id=do.storeId WHERE s.franchiseId=? GROUP BY s.id`(Check to see if store already exists)<br/>`INSERT INTO store (franchiseId, name) VALUES (?, ?)`(Create Store)|
| Close a store                                       |closeStore.jsx|[DELETE] /api/franchise/:franchiseId/store|`SELECT u.id, u.name, u.email FROM userRole AS ur JOIN user AS u ON u.id=ur.userId WHERE ur.objectId=? AND ur.role='franchisee'`<br/>`SELECT s.id, s.name, COALESCE(SUM(oi.price), 0) AS totalRevenue FROM dinerOrder AS do JOIN orderItem AS oi ON do.id=oi.orderId RIGHT JOIN store AS s ON s.id=do.storeId WHERE s.franchiseId=? GROUP BY s.id`(Find Store in database)<br/>`DELETE FROM store WHERE franchiseId=? AND id=?`(Delete franchise from database)|
| Login as admin<br/>(a@jwt.com, pw: admin)           |login.jsx|[PUT] /api/auth|`SELECT * FROM user WHERE email=?`<br/>`SELECT * FROM userRole WHERE userId=?`(Only runs if provided email is in use)|
| View Admin page                                     |adminDashboard.jsx|||
| Create a franchise for t@jwt.com                    ||||
| Close the franchise for t@jwt.com                   ||||
