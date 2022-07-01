"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const BackendContext_1 = require("../contexts/BackendContext");
const fetchMethods_1 = require("../../../common/fetchMethods");
const Spinner_1 = __importDefault(require("../componets/Spinner"));
const Pagination_1 = __importDefault(require("../componets/Pagination/"));
const TableWidhtAction_1 = __importDefault(require("../componets/Table/TableWidhtAction"));
const Monitoring_1 = __importDefault(require("./Monitoring"));
const initialPagination = {
    skip: 0,
    limit: 25,
    total: 0,
};
const Dashboard = () => {
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [settings, setSettings] = (0, react_1.useState)();
    const [message, setMessage] = (0, react_1.useState)('');
    const [currentDeployment, setCurrentDeployment] = (0, react_1.useState)('');
    const [metrics, setMetrics] = (0, react_1.useState)();
    const [deploymentsSource, setDeploymentsSource] = (0, react_1.useState)([]);
    const [columnsSource, setColumnsSource] = (0, react_1.useState)([]);
    const [pagination, setPagination] = (0, react_1.useState)(initialPagination);
    const { backend } = (0, BackendContext_1.useBackendContext)();
    const { workspaceService, backendService } = backend;
    (0, react_1.useEffect)(() => {
        return () => {
            setLoading(true);
            setDeploymentsSource([]);
            setMetrics(null);
            setCurrentDeployment('');
        };
    }, []);
    (0, react_1.useEffect)(() => {
        var _a;
        if (backendService !== undefined && workspaceService !== undefined) {
            const currentPath = ((_a = workspaceService.workspace) === null || _a === void 0 ? void 0 : _a.resource.path.toString()) || '';
            !currentPath &&
                setMessage('It is necessary to have at least one repository open.');
            if (currentPath) {
                backendService
                    .fileRead(`${currentPath}/.smartclide-settings.json`)
                    .then((backendRead) => {
                    setSettings(JSON.parse(backendRead));
                });
            }
        }
    }, [backendService, workspaceService]);
    (0, react_1.useEffect)(() => {
        message.length !== 0 && setLoading(false);
    }, [message]);
    (0, react_1.useEffect)(() => {
        console.log('metrics', metrics);
    }, [metrics]);
    (0, react_1.useEffect)(() => {
        setLoading(true);
        if (settings !== undefined &&
            pagination.skip !== null &&
            pagination.limit !== null) {
            const { gitLabToken, project, user } = settings;
            if (gitLabToken && project && user) {
                (async () => {
                    const deploymentFetchData = await (0, fetchMethods_1.getDeploymentList)(user, project, pagination.limit.toString(), pagination.skip.toString());
                    if (deploymentFetchData) {
                        if (deploymentFetchData.message) {
                            setMessage(deploymentFetchData.message);
                            setDeploymentsSource([]);
                            setPagination((prev) => ({
                                ...prev,
                                total: 0,
                            }));
                        }
                        else if (deploymentFetchData.data && deploymentFetchData.total) {
                            setMessage('');
                            setDeploymentsSource(deploymentFetchData.data);
                            setPagination((prev) => ({
                                ...prev,
                                total: deploymentFetchData.total || 0,
                            }));
                        }
                    }
                })();
            }
        }
    }, [pagination.skip, pagination.limit, settings]);
    (0, react_1.useEffect)(() => {
        deploymentsSource &&
            (deploymentsSource === null || deploymentsSource === void 0 ? void 0 : deploymentsSource.length) !== 0 &&
            setColumnsSource([
                'domain',
                'k8 url',
                'port',
                'replicas',
                'status',
                'created',
                'actions',
            ]);
    }, [deploymentsSource]);
    (0, react_1.useEffect)(() => {
        columnsSource && (columnsSource === null || columnsSource === void 0 ? void 0 : columnsSource.length) !== 0 && setLoading(false);
    }, [columnsSource]);
    (0, react_1.useEffect)(() => {
        let interval;
        if (currentDeployment.length !== 0) {
            interval = setInterval(async () => {
                const newMetrics = await getGetMetrics(currentDeployment);
                newMetrics && setMetrics(newMetrics);
            }, 6000);
        }
        return () => {
            setMetrics(null);
            clearInterval(interval);
        };
    }, [currentDeployment]);
    const getGetMetrics = async (id) => {
        if (!id || settings === undefined) {
            return null;
        }
        else {
            const { k8sToken } = settings;
            if (!k8sToken) {
                return null;
            }
            const newMetric = await (0, fetchMethods_1.getDeploymentMetrics)(id, k8sToken);
            return newMetric;
        }
    };
    const handleGetMetrics = async (id) => {
        setCurrentDeployment(id);
    };
    const handleStop = async (id) => {
        var _a, _b;
        const currentPath = ((_a = workspaceService.workspace) === null || _a === void 0 ? void 0 : _a.resource.path.toString()) || '';
        const prevSettings = currentPath &&
            backendService &&
            JSON.parse(await backendService.fileRead(`${currentPath}/.smartclide-settings.json`));
        const { k8sToken } = prevSettings;
        const deploymentDeleted = k8sToken && (await (0, fetchMethods_1.deleteDeployment)(id, k8sToken));
        if (deploymentDeleted) {
            const currentPath = ((_b = workspaceService.workspace) === null || _b === void 0 ? void 0 : _b.resource.path.toString()) || '';
            const prevSettings = currentPath &&
                backendService &&
                JSON.parse(await backendService.fileRead(`${currentPath}/.smartclide-settings.json`));
            const { gitLabToken, project, user } = prevSettings;
            const deploymentFetchData = gitLabToken &&
                project &&
                (await (0, fetchMethods_1.getDeploymentList)(user, project, pagination.limit.toString(), pagination.skip.toString()));
            if (deploymentFetchData) {
                if (deploymentFetchData.message) {
                    setDeploymentsSource([]);
                    setPagination((prev) => ({
                        ...prev,
                        total: 0,
                    }));
                }
                else if (deploymentFetchData.data && deploymentFetchData.total) {
                    setDeploymentsSource(deploymentFetchData.data);
                    setPagination((prev) => ({
                        ...prev,
                        total: deploymentFetchData.total || 0,
                    }));
                }
            }
        }
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Deployments"),
        !loading ? (message ? (react_1.default.createElement("h3", { style: { textAlign: 'center' } }, message)) : (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(TableWidhtAction_1.default, { columnsSource: columnsSource, dataSource: deploymentsSource, actionEdit: handleGetMetrics, actionStop: handleStop }),
            react_1.default.createElement(Pagination_1.default, { limit: pagination.limit, skip: pagination.skip, total: pagination.total, setState: setPagination }),
            metrics && (react_1.default.createElement(Monitoring_1.default, { usage: metrics.usage, cost: metrics.cost }))))) : (react_1.default.createElement(Spinner_1.default, { isVisible: loading }))));
};
exports.default = Dashboard;
//# sourceMappingURL=Dashboard.js.map