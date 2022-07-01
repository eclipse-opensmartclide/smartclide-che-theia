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
const Spinner_1 = __importDefault(require("../componets/Spinner"));
const ChartSynchronizedArea_1 = __importDefault(require("../componets/ChartSynchronizedArea"));
const Price_1 = __importDefault(require("../componets/Card/Price"));
const Monitoring = (props) => {
    const { usage, cost } = props;
    const [loadingChart, setLoadingChart] = (0, react_1.useState)(true);
    const [loadingPrice, setLoadingPrice] = (0, react_1.useState)(true);
    const [usageData, setUsageData] = (0, react_1.useState)();
    const [costData, setCostData] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        setLoadingChart(false);
        setUsageData((prev) => (prev ? [...prev, usage] : [usage]));
    }, [usage]);
    (0, react_1.useEffect)(() => {
        setLoadingPrice(false);
        setCostData(cost);
    }, [cost]);
    (0, react_1.useEffect)(() => {
        console.log('usageData', usageData);
    }, [usageData]);
    (0, react_1.useEffect)(() => {
        console.log('costData', costData);
    }, [costData]);
    return !loadingChart && !loadingPrice ? (react_1.default.createElement("div", { id: "SmartCLIDE-Widget-Monitorig", className: "text-center" },
        react_1.default.createElement("h4", { className: "text-white" }, "Deployment is running"),
        !loadingChart ? (react_1.default.createElement(ChartSynchronizedArea_1.default, { data: usageData })) : (react_1.default.createElement(Spinner_1.default, { isVisible: loadingChart })),
        !loadingPrice ? (react_1.default.createElement("div", { className: "d-flex mt-1" }, costData === null || costData === void 0 ? void 0 : costData.map((costData, index) => {
            const { cost, cost_type, name, current } = costData;
            return (react_1.default.createElement(Price_1.default, { key: index, cost: cost, cost_type: cost_type, name: name, current: current }));
        }))) : (react_1.default.createElement(Spinner_1.default, { isVisible: loadingPrice })))) : (react_1.default.createElement(Spinner_1.default, { isVisible: loadingChart && loadingPrice }));
};
exports.default = Monitoring;
//# sourceMappingURL=Monitoring.js.map