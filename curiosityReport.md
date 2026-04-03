# AWS Pricing Curiosity Report

## Why I chose AWS Pricing
I chose to look into the costs of the AWS services that we used in class because they are so applicable to any real business setting. Realistically I will be interacting with AWS services throughout my career as a software developer. Even if I don't spend tons of time in frontend web development, practically every service is expected to be availble for API requests and other remote access. I have been taking Economics 110 this semester and one of the key things I have learned from the section on businesses, is that the driving force of a business is their cost curve. Knowing the costs and how to estimate them for my employer will be an important skill throughout my career.

## My Experiment
I worked at a fairly successful local restaurant chain in high school. Since I am very familiar with the workings of their business, menu, and daily usage; it was relatively straighforward to get a rough estimate of the usage they would require for the location (their busiest) I worked at. In this scenario, I assumed that I convinced the owner to hire me to make a website very similar to JWT Pizza for the restaurant. While I can't use the JWT Pizza website for a projection of customer usage, I can use it to estimate the number of HTTP requests the average food order would make. I can also use it to estimate factors such as asset sizes and amounts. I made sure to increase my estimates by a healthy 50% of what I observed as an employee to account for business growth in the past 6 years and leave a padding to maintain maximum performance.

__Benefits of Using AWS__

- AWS manages the servers and automatically scales when needed
- Vast economy of scale reduces prices dramatically!
- Superior reliability to a locally hosted webpage.


## Economic Principles
Since restaurants work with very tight profit margins, I aimed to minimize the variable costs and front load on upfront investment. Since this restaurant chain is very stable, it made sense to favor slightly high fixed costs and therefore lower variable costs. With lower variable costs, the owner will make more profit for each unit sold!

__Definitions__
- Investment: One time costs for infrastructure or capital
- Fixed Costs: Costs that are continously incurred even when nothing is sold
- Variable Costs: Costs that fluctuate based on the number of goods produced
- Total Cost: Aggregate of fixed and variable costs

---

![AWS Cost Estimate](./AWS%20Estimate.png)

---

## Cost Breakdown
Below you will find the calculation that AWS gives for a load balancer to fit the approximations that made for the restaurant I worked for. I assumed a peak load of 3.5 hours during the dinner rush. Since my location is very close to an LDS temple, I would expect to see very heavy loads on nights of youth activities since large groups would come for dessert after a group temple night.

![Load Balancing Breakdown](./Workload%20Estimation.png)


## Conclusion/Final Thoughts
One of my main takeaways from this experiment was figuring out how cheap it really is to host a public facing website. Roughly $200 annually is very doable for my old workplace. Notably, I did not account for development cost or ongoing development maintainence in my consideration. Mostly I loved getting curious and thinking about the needs of a real business and how the things I have learned in this class can actually apply to them. I remember how many times I wished that this restaurant had a website when I worked as a teenager there. The real positive impact that this could bring is a meaningful way that I could now serve my brothers and sisters.