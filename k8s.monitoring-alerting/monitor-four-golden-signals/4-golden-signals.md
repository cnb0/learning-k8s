
# 4 Golden signals 

```
- Many of the traditional performance monitoring techniques are 
   ill-suited to monitor microservices

- Monitoring potential causes such as CPU, memory, and file system
   are frequently irrelevant due to the embedded resilient nature of 
   cloud-native architectures
        - Cloud Native
        - Microservices - distributed
        - On Cloud Platforms

- High utilization isn't an issue if your SLO - service level objectives are being met

- golden signals are two supporting methods:
             - The USE Method: 
                         - This method can analyze the performance of most any system.
                         - Utilization, saturation and errors. 
                         
             - The RED Method: 
                        - This method focuses on service monitoring
                        - rate, errors, and duration

- It takes time to set up the signals for all the components in today’s 
  modern cloud native applications 

- The easiest path is to shift left and begin monitoring and 
  testing the application during the development and load-test phases, 
  understanding the performance characteristics before the production rollout  

- What to do with the golden signals

            - The golden signals are great for monitoring continuously delivered 
                cloud-based and on-premises applications.
            - The approach applies to any application. 
            - After the signals are in place, it's much easier to determine 
                any extra monitoring that the application or operating platform need.

            - The successful implementation of the golden signals 
               is key to achieving observability. 
                     - Apply the signals to these activities:
                                - Monitoring application runtimes
                                - Monitoring the user experience
                                - Synthetic or black-box monitoring
                                - Creating useful dashboards that provide information about the monitored component

                - Collect and store metric data 
                        - to support query capabilities 
                        - establish performance normalcy and 
                        -  trending for the monitored service. 
              
                - We  can also use metric data to explore hypotheses and 
                  institute AIops capabilities. 
                
                - Metric data 
                        - can provide searchable 
                        - extensible data dimensions 
                        - be a robust data source for dashboards. 
                
                - Dashboards are no longer static and 
                    - require slice-and-dice capabilities of the data to investigate
                      an incident or improve the application's performance or scalability

                - Send actionable alerts. No false alarms. 

                - Make sure that alerts require intervention by a first responder and 
                  that they contain valuable context as to what is going on.

          - Latency
                    - Latency is the time that it takes to service a request, or 
                        the metric that is  formally known as response time. 
                    
                    - It’s important to measure 
                            - the latency from service to service 
                            - the latency that the user is experiencing 
                    
                    - Establish a baseline for application normalcy with latency. 
                        It is a key indicator of degradation in the application.
                        
                    - Don't use averages against latency, as they can be misleading. 
                            Rather, use histograms for this metric. 
                    
                    - Establishing percentile thresholds and values provide a better 
                        understanding of what the latency is. 
                        
                        Values in the 95th or 99th percentile are key to detecting 
                        performance issues in a request or a component.
                        
                    - Be sure to monitor the latency of errors, too. 
                        One bad long performing transaction can induce latency 
                        to the good requests, making for unhappy users.

          - Traffic
                    - Traffic is the amount of activity in the application. This value might be different 
                        depending on the characteristics of the application.  don't use averages. 
                    
                        Examples of traffic include 
                                - the number of requests that an API handled, 
                                - the number of connections to an application server, and 
                                - the bandwidth that was consumed to stream an application.

           - Errors
                        - Errors are the rate of requests that are failing. 
                        - Monitoring explicit errors, such as HTTP 500s, is straightforward. 
                        You also need to "catch" the HTTP 200s that are sharing the wrong content. 
                        Measure errors in rates.
                        - Errors should expose 
                                - bugs in the application, 
                                - misconfigurations in the service, and 
                                - dependency failures. 
                        - Error rates can also affect other measurements, 
                                such as lowering latency or increasing saturation.

           - Saturation
                        - Saturation is how "full" your service is. 

                        - The type of application that you're monitoring is directly related
                            to the utilization metrics that you use to determine saturation. 

                        - Saturation is the most challenging signal to implement. 

                        - we need utilization metrics and the utmost flexibility to determine saturation.

                          A few examples for determining saturation are as follows:
                            - CPU and memory for all applications
                            - Disk I/O rates for databases and streaming applications
                            - Heap, memory, thread pool garbage collection for Java™ applications
                            - 99th percentile for latency

                        - Keep in mind that the application services usually start to degrade 
                          before a metric reaches 100% utilization.


- *** Proactive SRE goes past the golden signals

        - monitoring the golden signals is a great start to understanding 
          incidents in your service,
        
        - SRE teams can proactively learn more about their system 
          through numerous additional techniques. 
          by running organized tests in both staging and production,
        
        - SRE teams can actively learn about their systems and 
          use the information to build reliability into their services.

        - Chaos Engineering: 
                - Used by teams to experiment on their systems to proactively 
                  detect failure points or potential weaknesses. 

                - By actively injecting chaos into your service, We can see exactly 
                  how the system responds to different circumstances.

        - Game Days: 
                - While chaos engineering is geared toward understanding your system, 
                  game days can be used to understand your people. 

                - Game days are used to test the resiliency of your team when it comes 
                  to incident response and remediation 

                - You can use the learnings from game days to develop more efficient 
                  processes or determine the need for new tools 
                  that make people more efficient.
                        - The game day was designed to show us a number of things:
                              - Ways to improve visibility for content deployments and errors
                              - Expectations held by new on-call responders
                              - The effectiveness of the associated runbooks
                              - The importance of system exposure when on-call
          
          - Proactive/Synthetic Monitoring:
                   - The use of synthetic monitoring allows teams to create artificial users and
                     simulate user behavior through a service

                   - We can determine specific artificial behavior flows in order to learn more 
                     about how your system responds under pressure 

                   - Synthetic monitoring is an excellent method for granularly testing and 
                     determining the reliability of specific services within your greater system.