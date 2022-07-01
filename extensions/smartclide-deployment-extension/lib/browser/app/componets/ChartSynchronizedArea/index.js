"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const recharts_1 = require("recharts");
// let interval: any;
const ChartSynchronizedArea = (props) => {
    const { data } = props;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("p", { className: "text-white mb-0 text-left" }, "RAM"),
        react_1.default.createElement(recharts_1.ResponsiveContainer, { width: '100%', height: 200 },
            react_1.default.createElement(recharts_1.AreaChart, { width: 600, height: 200, data: data, syncId: "anyId", margin: {
                    top: 10,
                    right: 0,
                    left: -20,
                    bottom: 0,
                } },
                react_1.default.createElement(recharts_1.CartesianGrid, { strokeDasharray: "3 3" }),
                react_1.default.createElement(recharts_1.XAxis, null),
                react_1.default.createElement(recharts_1.YAxis, { type: "number", domain: [0, 8000] }),
                react_1.default.createElement(recharts_1.Tooltip, { contentStyle: {
                        backgroundColor: '#333333',
                        color: '#ccccc',
                    }, label: false, labelFormatter: () => '' }),
                react_1.default.createElement(recharts_1.Area, { isAnimationActive: false, type: "monotone", dataKey: "memory", stroke: "#8884d8", fill: "#8884d8" }))),
        react_1.default.createElement("p", { className: "text-white mb-0 text-left" }, "CPU"),
        react_1.default.createElement(recharts_1.ResponsiveContainer, { width: '100%', height: 200 },
            react_1.default.createElement(recharts_1.AreaChart, { width: 600, height: 200, data: data, syncId: "anyId", margin: {
                    top: 10,
                    right: 0,
                    left: -20,
                    bottom: 0,
                } },
                react_1.default.createElement(recharts_1.CartesianGrid, { strokeDasharray: "3 3" }),
                react_1.default.createElement(recharts_1.XAxis, null),
                react_1.default.createElement(recharts_1.YAxis, { type: "number", domain: [0, 100] }),
                react_1.default.createElement(recharts_1.Tooltip, { contentStyle: {
                        backgroundColor: '#333333',
                        color: '#ccccc',
                    }, label: false, labelFormatter: () => '' }),
                react_1.default.createElement(recharts_1.Area, { type: "monotone", dataKey: "cpu", stroke: "#82ca9d", fill: "#82ca9d", isAnimationActive: false })))));
};
exports.default = ChartSynchronizedArea;
//# sourceMappingURL=index.js.map