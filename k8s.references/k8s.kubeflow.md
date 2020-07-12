## k8s Kubeflow


When deploying machine learning applications, building models is only a small part of the story. 
The entire process involves developing, orchestrating, deploying, and running scalable and portable machine learning workloads—a process Kubeflow makes much easier. With this practical guide, data scientists, data engineers, and platform architects will learn how to plan and execute a Kubeflow project that can support workflows from on-premises to the cloud.

    - Kubeflow is an open source Kubernetes-native platform based on Google’s internal machine learning pipelines, and 
    - cloud vendors including AWS and Azure advocate the use of Kubernetes and Kubeflow to manage containers and machine learning  infrastructure.
    -  build machine learning applications.

        - Get a concise overview of Kubernetes and Kubeflow
        - Learn how to plan and build a Kubeflow installation
        - Operate, monitor, and automate your installation
        - Provide your Kubeflow installation with adequate security
        - Serve machine learning models on Kubeflow


```

1. Introduction to Kubeflow
                    Machine Learning on Kubernetes
                            The Evolution of Machine Learning in the Enterprise
                            It’s Harder Than Ever to Run Enterprise Infrastructure
                            Identifying Next Generation Infrastructure Core Principles
                            Enter: Kubeflow
                            Origin of Kubeflow
                            Who Uses Kubeflow?
                    Common Kubeflow Use Cases
                            Running Notebooks on GPUs
                            Shared Multi-Tennant Machine Learning Environment
                            Example: Building a Transfer Learning Pipeline
                            Deploying Models to Production for Application Integration
                    Components of Kubeflow
                            Jupyter Notebooks
                            Machine Learning Model Training Components
                            Hyperparameter Tuning
                            Pipelines
                            Machine Learning Model Inference Serving
                    An Overview of Kubernetes
                    Core Kubenetes Concepts

2. Planning a Kubeflow Installation
                    Users
                            Profiling Users
                            Varying Skillsets
                    Kubeflow Components
                            Components that Extend the Kubernetes API
                            Components running atop of Kubernetes
                    Service Mesh Management with Istio
                    Serverless Container Operations with KNative
                    Workloads
                            Cluster Utilization
                            Data Patterns
                    GPU Planning
                            Planning for GPUs
                            Models that Benefit from GPUs
                    Infrastructure Planning
                            Kubernetes Considerations
                            On-Premise
                            Cloud
                            Placement
                    Container Management
                    Security
                            Background & Motivation
                            Control Plane
                            Kubeflow and Deployed Applications
                            Multitenancy & Isolation
                            Integration
                    Sizing & Growing
                            Forecasting
                            Storage
                            Scaling

3. Running Kubeflow on Google Cloud
                    Installing on a Public Cloud
                            Managed Kubernetes in the Cloud
                    Overview of the Google Cloud Platform
                            Storage
                            Google Cloud Security and the Cloud Identity-Aware Proxy
                            GCP Projects for Application Deployments
                            GCP Service Accounts
                            Google Compute Engine
                            Managed Kubernetes on GKE
                            Signing Up for Google Cloud Platform
                    Installing the Google Cloud SDK
                            Update Python
                            Download and Install Google Cloud SDK
                    Installing Kubeflow on Google Cloud Platform
                            Create a Project in the GCP Console
                            Enabling APIs for a Project
                            Set up OAuth for GCP Cloud IAP
                            Deploy Kubeflow Using the Command-Line Interface
                            Accessing the Kubeflow UI Post-Installation
                            Understanding How the Deployment Process Works
                            Understanding What Was Deployed on GCP
                    Creating Managed Kubernetes Clusters on GKE
                    Common Operations for Google Cloud and GKE
                            Resizing a Cluster
                            Deleting a Cluster

4. Model Serving and Integration
                    Basic Concepts of Model Management
                            Understanding Training Models vs Model Inference
                            Building an Intuition for Model Integration
                            Scaling Model Inference Throughput
                            Model Management
                    Introduction to KFServing
                            Advantages of Using KFServing
                            Core Concepts in KFServing
                            Supported Pre-Built Model Servers
                            KFServing Security Model
                    Managing Models with KFServing
                            Installing KFServing on a Kubernetes Cluster
                            Deploying a Model on KFServing
                            Managing Model Traffic with Canarying
                            Deploying a Custom Transformer
                            Rollback a Deployed Model
                            Removing a Deployed Model