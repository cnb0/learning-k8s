What is it?	"Not all memory and CPU in a Node can be used to run Pods. 
The resources are partitioned in 4:

1. Memory and CPU reserved to the operating system and system daemons such as SSH
2. Memory and CPU reserved to the Kubelet and Kubernetes agents such as the CRI
3. Memory reserved for the hard eviction threshold
4. Memory and CPU available to Pods

The graph show the total memory available for running Pods after subtracting the reserved memory"		

Example	If you have a Kubernetes cluster in GKE with a single Node of 2GB of memory, 
only 65% of the available memory is used to run Pods. 
The reamining memory is necessary to run the OS, Kubelet, CRI, CNI, etc.		
		
    
Notes	GKE and AKS reach 90% level of utilisation with instances over 64GB. 
EKS is 90% efficient starting with 8GB.		
			
What is it?	"Not all memory and CPU in a Node can be used to run Pods. 
The resources are partitioned in 4:

1. Memory and CPU reserved to the operating system and system daemons such as SSH
2. Memory and CPU reserved to the Kubelet and Kubernetes agents such as the CRI
3. Memory reserved for the hard eviction threshold
4. Memory and CPU available to Pods

The graph show the total memory available for running Pods after subtracting the reserved memory"		
	
			
Example	If you have a Kubernetes cluster in AKS with a single Node and 2 vCPU 
90% of the available CPUs are used to run Pods. 
The reamining memory is necessary to run the OS, Kubelet, CRI, CNI, etc.		
			
			
			
Notes	As long as you use node with at least 2 vCPU you should be fine.		
			
			
			
What is it?	"There's a upper limit on the number of Pods that you can run on each Node.

Each cloud provider has a different limit.

Most of the time the limit is independent of the Node size (e.g. GKE, AKS).

There are cases where the number of Pods depends on the Node size (notable: EKS)."		
			
			
      
Notes	"The metrics is relevant to measure your blast radius.

Assuming that a Node is lost how many Pods are affected?"		
			


What is it?	"Nodes have an upper limit on the number of Pods that they can run.

Assuming that you run the max number of Pods for that node, how much memory is available to each Pod?

This metric divides the available Node memory by the max number of Pods for that instance type."		
			
		
    
			
Example	If you have Kubernetes cluster in GKE with a single Node of 128GB of memory, 
you can run up to 110 Pods and each of them can use 1.08GB of memory.		
			
			
      
Notes	"It's not possible to run small workloads (less than 1GB of memory) efficiently on 
GKE when the node size is greater than 128GB of memory.

EKS has a peak at 192GB of memory. That's where there are the most Pod with the 
larger memory available to them (234 Pods with 810MiB of memory each)."		
			
      
			
What is it?	"If all my Pods are using 1GB of memory, what instance type 
I should use to maximise the memory available?

The charts presents 5 scenarios: what if all the Pods in the Node have 
limits of 1, 2, 4, 8 or 16 GiB.

The chart shows how utilised is the node."		
		
    
Example	"When all Pods in your cluster are 1GB, the best node that can allocate the most number 
of Pods is a Node with 64GB of memory.

Values before the peak means that the node is underutilised (there's still space, 
but not enough to run a Pod).

Values after the peak means that you reached the limit of Pods on that and 
you can't schedule more Pods on that node."		
			
      
Notes	"It's clear that the best Node for Pods that average 1GB of memory is a 64GB Node.

If the Pod memory limit increases in average to 2GB, a 192GB memory instance is the more efficient."		
	
  
What is it?	"If all my Pods are using 1GB of memory, what instance type I should use
to maximise the memory available?

The charts presents 5 scenarios: what if all the Pods in the Node have 
limits of 1, 2, 4, 8 or 16 GiB.

The chart shows how utilised is the node."		
			
	
  
			
Example	"When all Pods in your cluster are 1GB, the best node that can allocate the most
number of Pods is a Node with 192GB of memory.

Values before the peak means that the node is underutilised 
(there's still space, but not enough to run a Pod)."		
			
	
  
			
Notes	Pay attention to local inefficiencies due to the limits on how many Pods can be deployed on a Node.		
			
	
  
What is it?	"If all my Pods are using 1GB of memory, what instance type I should use 
to maximise the memory available?

The charts presents 5 scenarios: what if all the Pods in the Node have limits of 1, 2, 4, 8 or 16 GiB.

The chart shows how utilised is the node."		
			
	
  
			
Example	"When all Pods in your cluster are 1GB, the best node that can allocate the 
most number of Pods is a Node with 128GB of memory.

Values before the peak means that the node is underutilised (there's still space, 
but not enough to run a Pod).

Values after the peak means that you reached the limit of Pods on that and you can't 
schedule more Pods on that node."		
			
	
  
			
What is it?	"Nodes have an upper limit on the number of Pods that they can run.

Assuming that you run the max number of Pods for that node, how much CPU is available to each Pod?

This metric divides the available Node cores by the max number of Pods for that instance type."		
	
  
Example	"GKE can have at most 110 pods per node.

If the Node has 16 cores, you can split the available millicores evenly to all Pods. 
Each Pod receives a quota of 143.55 millicores."		
			
	
  
Notes	Larger nodes in GKE and AKS lead to Pod with more CPU available (due to the cap on the number of Pods)		
			
			
