import { DeploymentResponseData, ResponseData, MetricsResponseData, DeploymentData } from './ifaces';
export declare const postDeploy: (user: string, gitRepoUrl: string, project: string, k8sUrl: string, hostname: string, branch: string, replicas: number, deploymentPort: number, k8sToken: string, gitLabToken: string) => Promise<ResponseData | DeploymentData>;
export declare const getDeploymentStatus: (id: string, k8sToken: string) => Promise<ResponseData | DeploymentData>;
export declare const getDeploymentMetrics: (id: string, k8sToken: string) => Promise<MetricsResponseData>;
export declare const getDeploymentList: (user: string, project: string, limit: string, skip: string) => Promise<DeploymentResponseData>;
export declare const deleteDeployment: (id: string, k8sToken: string) => Promise<ResponseData>;
//# sourceMappingURL=fetchMethods.d.ts.map