## Security Risks and Challenges you’re likely to encounter when using Kubernetes

 -  in production and at scale. best practices and practical recommendations 
    to help you secure cloud-native infrastructure and applications

```

Images and image registries, when misused, can pose security issues
Organizations need strong governance policies regarding how images are built and stored in trusted image registries. 
You must ensure that container images are built using secure and approved base images that are regularly scanned and 
ensure that only images from whitelisted image registries are used to launch containers in your Kubernetes environment.

Containers talk to each other and to other endpoints

Containers and pods will need to talk to each other within deployments as well as to other internal and external endpoints 
to properly function. If a container is breached, the ability for a malicious actor to move laterally within the environment 
is directly related to how broadly that container can communicate with other containers and pods.

In a sprawling container environment, implementing network segmentation can be prohibitively difficult given the complexity
of configuring such policies manually.

Kubernetes offers rich configuration options, but defaults are usually the least secure
In keeping with DevOps principles, Kubernetes is designed to speed application deployment and simplify management and 
operations. 
Kubernetes offers a rich set of controls that can be used to effectively secure clusters and their applications.

Kubernetes network policies, for example, behave like firewall rules that control how pods communicate with each other 
and other endpoints. When a network policy is associated with a pod, that pod is allowed to communicate only with the assets 
defined in that network policy. By default, Kubernetes does not apply a network policy to a pod, meaning every pod can talk
to every other pod in a Kubernetes environment.

Another configuration risk relates to secrets management: how sensitive data such as credentials and keys are stored and 
accessed. You must ensure that secrets are not being passed as environment variables but are instead mounted into read-only 
volumes in your containers, for example.

Containers and Kubernetes pose compliance challenges
Cloud-native environments also introduce challenges in complying with security best practices, industry standards and 
benchmarks, and internal organizational policies.

Beyond remaining compliant, organizations also must show proof of that compliance. They must adapt their strategies to 
ensure their Kubernetes environments meet controls that were originally written for traditional application architectures.

Also, the distributed and dynamic nature of containerized applications means monitoring for compliance adherence and audits
must be fully automated to successfully operate at scale.

Containers create both familiar and new runtime security challenges
One of the security advantages of containers and Kubernetes is they can be treated as immutable infrastructure – what’s 
running should never be patched or changed but rather destroyed and recreated from a common template when new updates 
are needed.

Other properties of containers pose unique challenges, including their ephemerality and the speed at which they can be 
launched or removed.

And when a potential threat is detected in a running container, such as an active breach or a new vulnerability, you 
must be able to not only kill that container and relaunch a non-compromised version but also ensure that information 
is used to rebuild a new container image or to reconfigure a component within the environment that remediates the 
root cause of the issue

Other runtime security risks include a compromised container running malicious processes. Although crypto mining
has become a popular objective for malicious actors who compromise container environments, other malicious processes 
can also be executed from a compromised container, such as network port scanning to look for open paths to attractive
resources.

Successfully addressing these Kubernetes security challenges listed above (and many not listed here) requires
integrating security into each phase of the container lifecycle: build, deploy, and run.

You must build secure images that are free from critical vulnerabilities, configure deployments following 
security best practices, and protect workloads from threats at runtime.

Lastly, you must secure your Kubernetes infrastructure and its components, including the Kubernetes API server, 
etcd, etc. which increase the overall attack surface with unique threat vectors of their own.

=== Kubernetes Security Best Practices: Build Phase ===
Securing containers and Kubernetes starts in the build phase with securing your container images. Your time 
spent here will pay dividends later because any missed security best practices at this point will be 
significantly more costly to fix down the line – hence the phrase “shift left” meaning implementing security
at earlier stages as images are built.

The two main things to do here are to build secure images and to scan those images for any known vulnerabilities.

Recommendations
1) Use minimal base images

Avoid using images with OS package managers or shells because they could contain unknown vulnerabilities. 
If you must include OS packages, remove the package manager at a later step. Consider using minimal images 
such as distroless images, as an example..

2) Don’t add unnecessary components

Make sure to remove debugging tools from containers in production. Common tools – like Curl – 
that are useful to attackers should not be included in images.

3) Use up-to-date images only

Ensure your images (and any third-party tools you include) are up to date and utilizing 
the latest versions of their components.

4) Use an image scanner to identify known vulnerabilities

Your image scanner sho­uld be able to identify vulnerabilities within your images, including by layer, 
and tell you whether they are fixable or not. It must be able to scan for vulnerabilities in OS packages 
and third-party runtime libraries for the languages being used in your containerized applications.

5) Integrate security into your CI/CD pipeline

Make image scanning and other security checks part of your CI/CD pipeline to automate security and 
fail CI builds and generate alerts when your scanner detects high-severity fixable vulnerabilities.

6) Label non-fixable vulnerabilities

Sometimes there isn’t a fix for a known vulnerability, or the vulnerability is non-critical and 
therefore doesn’t warrant an immediate fix. In this instance, add them to a whitelist or filter 
the scanner output so that you don’t interrupt the development team’s workflow over non-actionable alerts.

7) Implement defense-in-depth

When a security issue is discovered in a container image or a running deployment that uses that image,
make sure you have policy checks and a remediation workflow in place to detect and update those images.

 === Kubernetes Security Best Practices: Deploy Phase ===

Kubernetes infrastructure should be configured securely prior to workloads being deployed. From a security perspective,
you first need visibility into what you’re deploying – and how. Then you can identify and respond to security 
policy violations.At a minimum, you need to know:

What is being deployed - including information about the image being used, such as components or vulnerabilities, and 
the pods that will be deployed
Where it is going to be deployed - which clusters, namespaces, and nodes
How it is deployed - whether it runs privileged, what other deployments it can communicate with, the pod security context
that is applied, if any
What it can access - including secrets, volumes, and other infrastructure components such as the host or orchestrator API
Is it compliant - whether it complies with your policies and security requirements
With this information, you can start to target areas for remediation and hardening and implement proper segmentation.

Recommendations

8) Use namespaces to isolate sensitive workloads

Namespaces are a key isolation boundary for Kubernetes resources. They provide a reference for network policies, 
access control restrictions, and other important security controls. Separating workloads into namespaces can help 
contain attacks and limit the impact of mistakes or destructive actions by authorized users.

9) Use Kubernetes network policies to control traffic between pods and clusters

By default, Kubernetes allows every pod to contact every other pod. Network segmentation policies are a key 
security control that can prevent lateral movement across containers in the case that an attacker breaks in. 
We covered how to set up Kubernetes network policies in two previous blog posts.

Building Kubernetes network policies to control ingress traffic
Building Kubernetes network policies to control egress traffic

10) Prevent overly permissive access to secrets

As a first step, make sure deployments mount only the secrets they actually require to prevent unnecessary exposure.

11) Assess the privileges used by containers

The set of capabilities, role bindings, and privileges given to containers can greatly impact your security risk. 
The goal here is to adhere to the principle of least privilege and provide the minimum privileges and capabilities that
would allow the container to perform its intended function.

Pod Security Policies are one way to control the security-related attributes of pods, including container privilege levels. 
These can allow an operator to specify the following:

Do not run application processes as root.
Do not allow privilege escalation.
Use a read-only root filesystem.
Use the default (masked) /proc filesystem mount
Do not use the host network or process space.
Drop unused and unnecessary Linux capabilities.
Use SELinux options for more fine-grained process controls.
Give each application its own Kubernetes Service Account.
Do not mount the service account credentials in a container if it does not need to access the Kubernetes API.

12) Assess image provenance, including registries

As a rule of thumb, don’t deploy code from unknown sources. For Kubernetes, this means using images from 
known/whitelisted registries only.

13) Extend your image scanning to deploy phase

As an extension of image scanning, enforce policies at the deploy phase based on scan results. One way to enforce
would be to use the Validating Admission Controller, a feature of Kubernetes to reject deployment creation when 
they specify images without scanning results or critical vulnerabilities, or if the images have been built over
90 days ago.

Images that haven’t been scanned recently might contain vulnerabilities that have been newly disclosed since the 
time of the last scan.

14) Use labels and annotations appropriately

For example, consider labeling or annotating your deployments with the name, email alias, or Slack channel of the
team responsible for an application. This will make it easier to alert the responsible team for triaging security
issues.

15) Enable Kubernetes role-based access control (RBAC)

RBAC provides a method for controlling authorization to access a cluster’s Kubernetes API server, both for users 
and service accounts in the cluster. Kubernetes RBAC is highly configurable, so make sure you’re not making any of
these 5 Kubernetes RBAC mistakes.

There are many more build- and deploy-time security best practices that are beyond the scope of a single blog post.
Start here and elevate your security by exploring additional resources listed at the end of this article.

Next we provide recommendations for securing your Kubernetes workloads during the runtime phase.

Kubernetes Security Best Practices: Runtime Phase

The runtime phase exposes containerized applications to a slew of new security challenges. Your goal here is to 
both gain visibility into your running environment and detect and respond to threats as they arise.

Proactively securing your containers and Kubernetes deployments at the build and deploy phases can greatly 
reduce the likelihood of security incidents at runtime and the subsequent effort needed to respond to them.

First, you must monitor the most security-relevant container activities, including:

Process activity 

Network communications among containerized services
Network communications between containerized services and external clients and servers
Observing container behavior to detect anomalies is generally easier in containers than in virtual machines
because of the declarative nature of containers and Kubernetes. These attributes allow easier introspection 
into what you have deployed and its expected activity.

Recommendations

16) Leverage contextual information in Kubernetes

Use the build and deploy time information in Kubernetes to evaluate observed versus expected activity during 
runtime in order to detect suspicious activity.

17) Extend vulnerability scanning to running deployments

Monitor running deployments for newly discovered vulnerabilities in addition to scanning for vulnerabilities 
that exist in container images.

18) Use Kubernetes built-in controls when available to tighten security

Configure the security context for pods to limit their capabilities. These controls can eliminate entire classes
of attacks that depend on privileged access. Read-only root file systems, for example, can prevent any attack 
that depends on installing software or writing to the file system.

19) Monitor network traffic to limit unnecessary or insecure communication

Observe your active network traffic and compare that traffic to what is allowed based on your Kubernetes network 
policies.
Containerized applications typically make extensive use of cluster networking, and observing active networking traffic
8is a good way to understand how applications interact with each other and identify unexpected communication.

At the same time, comparing the active traffic with what’s allowed gives you valuable information about what 
isn’t happening but is allowed. With that information, you can further tighten your allowed network policies so 
that it removes superfluous connections and decreases your attack surface.

Open source projects like https://github.com/kinvolk/inspektor-gadget may help with this, and commercial security
solutions provide varying degrees of container network traffic analysis.

20) Leverage process whitelisting

Process whitelisting is a tried and true practice for identifying unexpected running processes. First, observe the 
application for a period of time to identify all processes that are executed in the normal course of the application 
behavior, then use this list as your whitelist against future application behavior.

Operationalizing runtime analysis at the process level is challenging; look to commercial security vendors that 
have experience in containers and Kubernetes.

21) Compare and analyze different runtime activity in pods of the same deployments

Containerized applications are replicated for high availability, fault tolerance, or scale reasons. Replicas
should behave nearly identically; replicas with significant deviations from the others warrant further investigation. 
Integrate your Kubernetes security tool with other external systems (email, PagerDuty, Slack, 
Google Cloud Security Command Center, SIEMs [security information and event management], etc.) and 
leverage deployment labels or annotations to alert the team responsible for a given application when a potential 
threat is detected. Commercial Kubernetes security vendors should support a wide array of integrations with external 
tools.

22) If breached, scale suspicious pods to zero

Use Kubernetes native controls to contain a successful breach by automatically instructing Kubernetes to 
scale suspicious pods to zero or kill then restart instances of breached applications.

=== Infrastructure Security ===

So far, we’ve focused on security best practices for building, deploying, and running workloads orchestrated by K8s. 
Security, however, must extend beyond images and workloads and protect the entire environment, including the 
cluster infrastructure. You must secure your clusters, nodes and the container engine.

Recommendations

23) Update your Kubernetes to the latest version whenever possible

Remember that only the last three versions of Kubernetes are supported, including security patches 
for newly disclosed vulnerabilities. So, if a high-severity vulnerability is discovered in Kubernetes 
and you are four versions behind, your version will not receive the patch.

24) Securely configure the Kubernetes API server

Make sure you’re disabling unauthenticated/anonymous access and using TLS encryption for connections
between the kubelets and the API server. We have written more on this topic here.

25) Secure etcd

etcd is a key-value store (a CNCF project) used by Kubernetes for data access. etcd is considered the
source of truth for Kubernetes, and you can read data from and write into it as needed. Make sure client
connections are served only over TLS.

26) Secure the kubelet

As the main node agent running on each node, misconfiguring kubelet exposes you to backdoor access
through the kubelet. Make sure you’ve disabled anonymous access to the kubelet by starting the kubelet with the
--anonymous-auth=false flag and leverage the NodeRestriction admission controller to limit what the kubelet can access.

Kubernetes includes many more components, including the kube-scheduler, kube-controller-manager,
the configuration files on the master node and work node, etc. You can learn more about how to securely 
configure these Kubernetes components and meet your compliance requirements by following the recommendations provided here.


==== Final Thoughts: Operationalizing Kubernetes Security ====

The advent of containers and Kubernetes hasn’t changed the security mission. Your goal is still to 
make it difficult for bad actors to break into your applications and its infrastructure – and if they succeed, 
to catch them and stop them as quickly as possible. The tools and methodologies, however, must adapt to fit 
the needs of DevOps practices and cloud-native principles.

Recommendations

27) Embed security earlier into the container lifecycle

You must integrate security earlier into the container lifecycle and ensure alignment and shared goals
between security and DevOps teams. Security can (and should) be an enabler that allows your developers 
and DevOps teams to confidently build and deploy applications that are production-ready for scale, stability and security.

28) Use Kubernetes-native security controls to reduce operational risk

Leverage the native controls built into Kubernetes whenever available in order to enforce security policies
so that your security controls don’t collide with the orchestrator. Instead of using a third-party proxy or 
shim to enforce network segmentation, as an example, use Kubernetes network policies to ensure secure network communication.

29) Leverage the context that Kubernetes provides to prioritize remediation efforts

In sprawling Kubernetes environments, manually triaging security incidents and policy violations is time consuming.

For example, a deployment containing a vulnerability with severity score of 7 or greater should be moved up
in remediation priority if that deployment contains privileged containers and is open to the Internet but
moved down if it’s in a test environment and supporting a non-critical app.

```
