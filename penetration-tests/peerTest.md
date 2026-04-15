# Penetration Tests
____
Participants: Piper Dickson, Owen Werts     

## Self-Attacks
#### SQL Injection
**Piper Dickson**
|  Item         | Result  |
|---------------|---------|        
| Date          | April 9, 2026   |
| Target        | https://pizza.piperin.click/login  |
| Classification| Injection  |
| Severity      | 0  |
| Description   | Injection attack failed, no tables dropped, no successful logins  |
| Images        |   |   
| Corrections   | None needed  |

#### Brute-force
**Piper Dickson**
|  Item         | Result  |
|---------------|---------|        
| Date          | April 9, 2026   |
| Target        | https://pizza.piperin.click/login  |
| Classification| Brute-force  |
| Severity      |  3 |
| Description   | Access to administrator privileges granted, franchises and user information at risk  |
| Images        |   |   
| Corrections   | Admin password adjusted to be more secure  |

#### Cross-site Scripting (XSS)
**Piper Dickson**
|  Item         | Result  |
|---------------|---------|        
| Date          | April 9, 2026   |
| Target        | https://pizza.piperin.click  |
| Classification| XSS  |
| Severity      | 0  |
| Description   | HTML tags and JavaScript references were sucessfully ignored by the application  |
| Images        |   |   
| Corrections   | None needed  |


#### Authentication Bypass
**Piper Dickson**
|  Item         | Result  |
|---------------|---------|        
| Date          | April 9, 2026   |
| Target        | https://pizza.piperin.click  |
| Classification| Authentication Failure/Bypass  |
| Severity      |  3 |
| Description   | Authentication  |
| Images        |   |   
| Corrections   |   |



#### IDOR
**Piper Dickson**
|  Item         | Result  |
|---------------|---------|        
| Date          | April 9, 2026   |
| Target        | https://pizza.piperin.click  |
| Classification|  |
| Severity      |   |
| Description   |   |
| Images        |   |   
| Corrections   |   |

### **Owen Werts**
#### 1.Cross-Site Scripting (XSS)
|  Item         | Result  |
|---------------|---------|        
| Date          | April 9, 2026 |
| Target        | https://pizza.simicninja.click |
| Classification| Injection |
| Severity      | 0 |
| Description   | Attempted a stored XSS attack on the create store option for a franchisee. Attack failed and stored script was displayed as text. |
| Images        | ![Stored XSS Attack Request & Response](burpSuiteXSS.png) ![Page render of failed XSS attack](failedXSS.png)|
| Corrections   | None, since the attack failed. |

#### 2.URL Navigation Instead of GUI
|  Item         | Result  |
|---------------|---------|        
| Date          | April 12, 2026   |
| Target        | https://pizza.simicninja.click |
| Classification| Broken Access Control |
| Severity      | 1 |
| Description   | Basic users (without franchisee or admin roles) are able to access the webpage to create a store. Notably the API docs were completely open for public inspection and scrutiny giving potential threat actors valuable information. | 
| Images        | ![Improper Webpage Access](improperAccess.png) |
| Corrections   | Created functions to test user role in app.tsx. Applied role constraints to following routes: Create Franchise, Close Franchise, Create Store, Close Store, Docs |

#### 3.Store Close & Open API Manipulation
|  Item         | Result  |
|---------------|---------|        
| Date          | April 12, 2026   |
| Target        | https://pizza.simicninja.click |
| Classification| Broken Access Control |
| Severity      | 0 |
| Description   | Attempted an attack to modify the id values used in the create store and close store APIs. Since API calls use simple integer IDs for the franchise and store, it is trivial to change the values to target stores not owned by the user even without admin prvileges. Attack confirmed that the API requires the POST and DELETE request to be made by the owner of the "store" object or an admin. |
| Images        | ![API ID Manipulation](API_ID_Tampering.png) |   
| Corrections   | No corrections made since the attack failed. |

#### 4.
|  Item         | Result  |
|---------------|---------|        
| Date          | April 12, 2026   |
| Target        | https://pizza.simicninja.click |
| Classification| Insecure Design |
| Severity      | 2 |
| Description   | Successfully manipulated the HTTP payment request to alter the prices of given items. Using Burp Suite or another tool for modifying requests makes the attack much easier, but it is technically executable with a simple web browser. The attack is possible due to the price being provided by the HTTP request from the user instead of a lookup from the database. |
| Images        | ![Prices Altered](PriceAlteration.png) |   
| Corrections   |  |

**Owen Werts**
|  Item         | Result  |
|---------------|---------|        
| Date          | April 13, 2026   |
| Target        | https://pizza.simicninja.click |
| Classification|  |
| Severity      |  |
| Description   |  |
| Images        |  |   
| Corrections   |  |

## Peer-Attacks

