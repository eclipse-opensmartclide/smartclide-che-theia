"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDeployment = exports.getDeploymentList = exports.getDeploymentMetrics = exports.getDeploymentStatus = exports.postDeploy = void 0;
const SERVICE_URL = 'http://localhost:3000';
const postDeploy = async (user, gitRepoUrl, project, k8sUrl, hostname, branch, replicas, deploymentPort, k8sToken, gitLabToken) => {
    return await fetch(`${SERVICE_URL}/deployments?project_name=${project}&user=${user}&git_repo_url=${gitRepoUrl}&hostname=${hostname}&branch=${branch}&deployment_port=${deploymentPort}&k8s_url=${k8sUrl}&replicas=${replicas}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'gitlab-token': gitLabToken,
            'k8s-token': k8sToken,
        },
    })
        .then((res) => res.json().then((res) => res))
        .catch((err) => err);
};
exports.postDeploy = postDeploy;
const getDeploymentStatus = async (id, k8sToken) => {
    return await fetch(`${SERVICE_URL}/deployments/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'k8s-token': k8sToken,
        },
    })
        .then((res) => res.json().then((res) => res))
        .catch((err) => err);
};
exports.getDeploymentStatus = getDeploymentStatus;
const getDeploymentMetrics = async (id, k8sToken) => {
    return await fetch(`${SERVICE_URL}/metrics/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'k8s-token': k8sToken,
        },
    })
        .then((res) => res.json().then((res) => res))
        .catch((err) => err);
};
exports.getDeploymentMetrics = getDeploymentMetrics;
const getDeploymentList = async (user, project, limit, skip) => {
    return await fetch(`${SERVICE_URL}/deployments/?user=${user}&project=${project}&skip=${skip}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json().then((res) => {
        var _a;
        if (res === null || res === void 0 ? void 0 : res.message) {
            return res;
        }
        const data = (res === null || res === void 0 ? void 0 : res.data) ? res === null || res === void 0 ? void 0 : res.data : [];
        const total = (res === null || res === void 0 ? void 0 : res.count)
            ? res === null || res === void 0 ? void 0 : res.count
            : (res === null || res === void 0 ? void 0 : res.data)
                ? (_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.length
                : 0;
        return {
            data,
            total,
        };
    }))
        .catch((err) => err);
};
exports.getDeploymentList = getDeploymentList;
const deleteDeployment = async (id, k8sToken) => {
    return await fetch(`${SERVICE_URL}/deployments/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'k8s-token': k8sToken,
        },
    })
        .then((res) => res.json().then((res) => res))
        .catch((err) => err);
};
exports.deleteDeployment = deleteDeployment;
//# sourceMappingURL=fetchMethods.js.map