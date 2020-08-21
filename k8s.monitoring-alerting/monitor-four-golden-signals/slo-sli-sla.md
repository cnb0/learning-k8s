

## SLO 

```

 - business owner provides products or services to customers, 
   it's important to measure the service level from the customer's point of view

 - The product owner, with the development and the operations team, can agree on a 
   measurable service level objective (SLO) for the customer 
   that is a balance between velocity and quality


 - The development team's focus is
            - agility and velocity 
            - needs to introduce new features as fast as possible

 - The operation team's focus is 
            - availability, stability and quality
            - needs to introduce change in a controlled way

- The SLO is the customer's service reliability target level. 
     - It's an agreement by the product owner, DevOps and SRE team. 
     - we measure an SLO as a percentage of achievement over a period. 
     - To implement an SLO, we choose SLIs, which define what measurements are made and where, 
       and add the threshold and measurement period

- If an unachieved SLO causes commercial implications, it is called an SLA. 
- In an SLA, you define the parties and the commercial agreements. 
      - SLA can help to understand the KPIs, which are a business process
        measurement for that industry.

- As development and operations come closer together, 
  new practices arise to ease operations for cloud-based applications.

- Build to manage specifies a set of practices that developers (~12 factor)
        - Can adopt to instrument the application & 
        - Provide manageability aspects as part of the release.
        - When you implement a build-to-manage approach, consider these practices:
              - Health check APIs
              - Log format and catalog
              - Deployment correlation
              - Distributed tracing
              - Topology information
              - Event format and catalog
              - Test cases and scripts
              - Monitoring configuration
              - Runbooks
              - First Failure Data Capture

        - By adopting these practices, your organization achieves a more 
           mature operational level and faster velocity
        - DevOps team comes closer together as it works toward the common goal
          of quickly releasing robust functions that meet the required objectives
                        - functional 
                        - availability 
                        - performance  
                        - security 

- SLO 
        - The SLO is the customer's service reliability target level. 
        - To be effective, the SLO must be achievable and reflect the technical reality of your organization.
        - It needs to be high enough to keep the customer satisfied, 
            but low enough that the business can achieve it. 
        - Your SLO can change over time to improve as your system improves.

        - The SLO is an agreement by the product owners and  The DevOps team 
            
        - Express the SLO as a percentage of achievement over a period.
            The closer the number to 100%, the better the SLO is; 
            however, an SLO is rarely targeted to be 100%.


        - To calculate your SLO, we need to measure the metrics, or your service level indicators (SLIs). 
                    - SLIs are metrics that represent your service level from your customer's point of view. 
                    - For transactional services, such as a web service, a telecommunication service, or
                    a lookup service, 
                    - from the customer's devices.
                        - However, without installing an agent on the customer's devices, 
                        this measurement is hard to achieve. 
                        - In most implementations, the boundary of the service to the customer
                        is the next best place to measure. 
                            - One example is the load balancer that serves your web server's farm.

            - The process to define your SLO and SLI is iterative. 
                        - SLOs are driven by business requirements, 
                        - SLIs are driven by the available measurement or the measurement that can be made available. 

            - The initial SLO might postulate objectives that either aren't technically achievable or are difficult and
            expensive to achieve. 
            - Iteratively negotiate the SLOs between affected parties,
                        - the product owner, the DevOps engineers, and the SRE teams
                        by comparing the expected business result with the current baseline. 
            
            - Adjust your SLOs and SLIs as business requirements arise or become no longer valid, or 
              as important performance metrics become available or unavailable.


            -  SLO measurement points or methods:
            
                                - What you want to measure	
                                        - Measurement points or methods
                                - Application-level metrics	
                                        - Exposing SLI metrics from the code that is serving requests 
                                        from people or processing their data
                                - Server-side logs	
                                        - Processing server-side logs of requests or processed data to generate SLI metrics
                                - Front-end infrastructure metrics	
                                        - Using metrics from load-balancing infrastructure, 
                                        such as a layer 7 load balancer, to measure SLIs
                                - Synthetic clients or data	
                                        - Building a client that sends fabricated requests at 
                                        regular intervals and validates the responses
                                - Data-processing pipelines	
                                        - Creating synthetic known-good input data and validating output
                                - Client-side instrumentation	
                                        - Adding observability features to the client that the 
                                        customer is interacting with and logging events back to
                                        your serving infrastructure that tracks SLIs

                
                    - Another kind of common service is an API.
                        - In most cases, APIs aren't directly consumed by humans.
                        - Here, the user of a service becomes the consumer of an API. 
                        - Like the application-level metrics, a good method to measure the SLI is 
                        when the API server exposes the metrics. 

                    - Defining SLIs is often a matter of selecting metrics from your performance management system.
                    - Typically, your performance management system is set up to produce a few essential performance metrics.
                    - having too many SLIs can be distracting and prevent you from paying enough attention 
                    to the more critical indicators. 
                            - These metrics are crucial for the infrastructure or components of your system.
                                    - For transaction services, these SLIs are common:
                                            - Availability: Were you able respond to the request?
                                            - Latency: How long did it take to respond?
                                            - Throughput: How many requests were you able to handle?
                                            - Error rate: How many errors were generated for the request that was handled?
                                -  For storage services, 
                                                - common SLI is durability
                                                    - which measures the likelihood that data can be kept over a long period.

- Percentile distribution measurement
           - Some SLIs are easy to measure. 
                - For example, you can derive the error rate of your HTTP request (a measure of availability) 
                  by dividing the number of responses with status 5xx divided by total HTTP requests.
          - Other SLIs are more challenging to collect depending on your performance management system.
                - For example, to derive the transaction saturations percentage,
                  you need the upper limit, which might be hard to determine.

         - For most SLIs, look at the percentile distribution and the average value
           that is provided by a traditional performance management system. 
         - With a modern performance management system, you can collect samples and distribute 
           them into groups of value. Then, you can monitor the distribution of the 
           samples based on the groups and learn the percentile distribution.

                - example can be  the results of two samples of 50,000 response times of a web server 
                  that were taken over a day on different days of the week.

- Variance
        - Another way to see why a percentile distribution is useful is the concept of variance. 
        - People often accept a slightly slower response time from a web server that behaves consistently 
          instead of a server with a faster response time that occasionally slows down. 
        - In a Voice over IP (VoIP) transmission, an important measure is a jitter, 
          the variance in the transfer of the VoIP packets.
          When both the transfer rate and jitter are high, 
          you can hear the voice without delay, but it is hard to understand.

        - If your performance management solution can measure variance, 
          that is an excellent measurement to include in the SLO. 
        - If not, the percentile distribution graph can help you to see the variance.
        

- Error Budget
        - An SLO is rarely 100%, especially if you provide the service to another service. 
        - As the consumer of your service, the other service must never assume 100% reliability. 
          - This concept is something that developers need to consider as they build the code. 
            They must build the service to handle failure from other services that it depends on. 
                    Example - Circuit Breaker Pattern.

        - Another reason why most SLOs are not 100% is to encourage improvement through change. 
            - If you're at the end of the cycle of measurement and your SLO is still far above target, 
              the team can introduce a new improvement to the system more aggressively. 
              They still have room to experiment, and they still have a budget. 
              The team still has an error budget.

        - Assume that your availability target is 99.9% for the four-week cycle and that 
          your error budget is 0.1% x 4 weeks = 40 minutes. 
          If it's near the end of the four weeks and your availability for that period is 100%, 
          the team can afford to use 40 minutes to introduce change. 
          
        - expressing SLO in percentage makes it easier to calculate your error budget.


- Period of measurement
      - we can specify the period of measurement for the SLO in two ways: 
                - rolling window 
                - calendar window. 
            - The calendar window is easier to manage and report, 
                - Two major downtimes, one at the end of the month and another one at the 
                   beginning of the next month,
                -  might be acceptable in an SLO with a calendar month period of measurement.
            - The rolling window might be more meaningful from the SLO measurement point of view.
                - In a rolling window measurement, 
                    - the two downtimes might breach your SLO if they happen near each other. 
                    - A rolling window measurement measures the customer experience better.

- SLO segmentation based on users

- Service level agreements
        - A service level agreement (SLA) is an agreement with the customer that defines the achievement of the SLO 
          for that customer in a specific period and 
        - includes the commercial implications for breaching the SLO.
        - An easy way to determine whether an SLO represents an SLA is to ask, 
           - "Are there any commercial implications if the SLO is not met?" 
           - If the answer is "yes", it is an SLA. 
           - An SLA, as a contract, can have one or more SLOs defined.
        - An SLA can also include other commitments, such as response time and repair time. 
        - Because an SLA is a business contract, it is useful to know the key indicators 
          for a specific customer's industry. 
        - In the area of business process, KPIs are used. 
        - KPIs are like SLIs, but the focus of a KPI is more on measurement 
          that helps you understand how your organization or department is performing.