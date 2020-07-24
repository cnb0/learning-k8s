```
In Kubernetes 

    1. Everything you interact with is an Object
    2. Everything revolves around Pods
    3. Kubernetes works through a series of control loops
    4. Different Kubernetes components do not communicate with each other directly

Understanding these key concepts allows experienced teams to accelerate and maximise their 
use of Kubernetes and the value they extract. They stop talking about individual machines or 
specific network sockets and start describing the behaviour of their applications — 
how they should be deployed, accessed and respond to changes.

=== Kubernetes offers a collection of patterns ===

1. Everything is an Object

                Everything user-facing in a Kubernetes cluster is represented as an object. 
                Whether it’s a persistent volume on your cloud infrastructure, a networking endpoint or 
                a machine in your cluster — it’s represented as an Object with its own structure and schema.


2. Everything revolves around Pods

                A Pod is a basic workload unit of Kubernetes. While we say Kubernetes
                is a Container orchestrator platform, we do not deal with containers directly, 
                but rather with a conceptual wrapper around it called a Pod.

                A Pod is how you run your containers, and by extension your software. 
                On their own, Pods don’t do much other than run containers, 
                but all other objects in one way or the other deal with managing Pods.


                 The key thing to understand is — while Pods can run multiple containers,
                  if you want several instances of an application running, you would not run a Pod 
                  with multiple identical containers, instead you’d run several Pods running a single container.



3. Kubernetes control loops

                You interact with Kubernetes by declaring your intent (a desired state). 
                You specify in a declarative manner (using a manifest file) the components
                of your system and how they should behave when responding to changes. 
                You then submit this manifest to Kubernetes and let Kubernetes 
                do the hard work of deploying and maintaining your application.


                At the heart of how this works is a series of control loops with a basic principle: 
                make sure the current observed state of the application matches the desired state.


                A simple example might be requesting 5 replicas of a particular Pod. 
                You define this in the manifest file and submit it to Kubernetes 
                (using a very common Kubernetes control loop called a Deployment). 
                Kubernetes schedules the Pods and implements a control loop to ensure 
                there are always 5 replicas of the requested Pod running. 
                If one or more go down, almost immediately new ones will be created.


4. Different Kubernetes components do not communicate with each other directly

                  The next point we try to get across is that Kubernetes is set of 
                  loosely coupled specialist components making their own independent 
                  decisions based on changes to the state of the cluster.


                  We continue with this point is because we've observed that 
                  it's often hard to transition from an "if-this-then-that" 
                  mindset to a more organic model implemented by Kubernetes.

                  Usually, several control loops are engaged in a change -- each one focussing 
                  on their job without directly notifying others about their action other than
                  manipulating the central state. By working on their own area of responsibility, 
                  in parallel with others, they achieve a higher order task.

                  Assume we are routing traffic to 5 Pods running a web service while they're in 
                  the process of being updated (replaced). In this scenario we have two controllers 
                  doing two specialised jobs -- the Deployment controller is updating the 5 Pods and
                  the Service controller in rerouting network traffic. However, the two controllers 
                  do not communicate directly with each other, instead they manipulate a centralised state. 
                  For example, the Service controller monitors changes to the state of the cluster, 
                  observes old Pods being removed and new Pods being added, and makes
                  its own decisions on which Pods to route traffic to.


5. Kubernetes offers a collection of patterns

                  With these two key principles internalised, it's much easier to explain and 
                  understand the different objects offered by Kubernetes, and that at its core, 
                  Kubernetes is a set of very useful patterns to solve real world problems.

                  If you need a certain number of stateless applications to always be running and 
                  easily upgradable — use a Deployment object. 
                  If part of an app needs state and a persistent identity - use a StatefulSet object etc.

                  Each object has its own controller and a specific use case and can be tweaked, but in the end, 
                  they are a set of configurable patterns that allow you to describe how your 
                  application should be deployed, accessed, and how it should respond to changes.
```