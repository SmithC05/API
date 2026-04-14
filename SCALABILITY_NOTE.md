# Scalability Note

This project is designed with a modular structure, which makes it easier to scale over time. Controllers, routes, middleware, models, and utilities are separated clearly, so new features can be added without making the code difficult to maintain.

For application scaling, the API can run on multiple server instances behind a load balancer. This helps handle more traffic without changing the application logic. Since JWT authentication is stateless, it works well in a horizontally scaled setup.

On the database side, indexes on fields such as `email` and `userId` can improve query performance. Redis can also be introduced for caching common reads like repeated task lists or user profile data. In the future, the system can move toward microservices by separating authentication, task management, and other business areas into independent services if the project grows significantly.
