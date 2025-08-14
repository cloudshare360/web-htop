"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const systemInfo_1 = require("../services/systemInfo");
const router = express_1.default.Router();
router.get('/system-stats', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('API endpoint called');
        const stats = yield (0, systemInfo_1.getSystemStats)();
        console.log('Stats retrieved:', stats);
        res.json(stats);
    }
    catch (error) {
        console.error('Error in API:', error);
        res.status(500).json({ error: 'Failed to fetch system stats' });
    }
}));
exports.default = router;
