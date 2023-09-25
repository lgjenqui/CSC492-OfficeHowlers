"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const app = (0, express_1.default)();
const port = 8080;
const corsOptions = {
    origin: '*'
};
db_1.db.sequelize.sync();
app.get('/test', (0, cors_1.default)(corsOptions), (req, res) => {
    const status = {
        "Status": "Running",
        "Message": "Hello World!"
    };
    res.send(status);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=app.js.map