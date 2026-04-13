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
#### Cross-Site Scripting (XSS)
|  Item         | Result  |
|---------------|---------|        
| Date          | April 9, 2026 |
| Target        | https://pizza.simicninja.click |
| Classification| Injection |
| Severity      | 0 |
| Description   | Attempted a stored XSS attack on the create store option for a franchisee. Attack failed and stored script was displayed as text. |
| Images        | ![Stored XSS Attack Request & Response](burpSuiteXSS.png) ![Page render of failed XSS attack](failedXSS.png)|
| Corrections   | None, since the attack failed. |

**Owen Werts**
|  Item         | Result  |
|---------------|---------|        
| Date          | April 12, 2026   |
| Target        | https://pizza.simicninja.click |
| Classification| Broken Access Control |
| Severity      | 1 |
| Description   | Basic users (without franchisee or admin roles) are able to access the webpage to create a store. | 
| Images        | ![Improper Webpage Access](improperAccess.png) |
| Corrections   | Created functions to test user role in app.tsx. Applied role constraints to following routes: Create Franchise, Close Franchise, Create Store, Close Store, Docs |

**Owen Werts**
|  Item         | Result  |
|---------------|---------|        
| Date          | April 9, 2026   |
| Target        | https://pizza.simicninja.click |
| Classification|  |
| Severity      |  |
| Description   |  |
| Images        |  |   
| Corrections   |  |

**Owen Werts**
|  Item         | Result  |
|---------------|---------|        
| Date          | April 9, 2026   |
| Target        | https://pizza.simicninja.click |
| Classification|  |
| Severity      |  |
| Description   |  |
| Images        |  |   
| Corrections   |  |

**Owen Werts**
|  Item         | Result  |
|---------------|---------|        
| Date          | April 9, 2026   |
| Target        | https://pizza.simicninja.click |
| Classification|  |
| Severity      |  |
| Description   |  |
| Images        |  |   
| Corrections   |  |

## Peer-Attacks

