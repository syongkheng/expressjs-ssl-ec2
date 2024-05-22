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
const openai_1 = __importDefault(require("../config/openai"));
const prompt = (userPrompt) => __awaiter(void 0, void 0, void 0, function* () {
    let response = { message: "", data: {} };
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const completion = yield openai_1.default.chat.completions.create({
                messages: [{ role: "system", content: "(Please limit your response to 1000 tokens): " + userPrompt }],
                model: "gpt-3.5-turbo",
            });
            const response = completion.choices[0];
            resolve(response.message.content);
        }
        catch (error) {
            response.message = `Gpt Failure`;
            reject({ statusCode: 500, error: response });
        }
    }));
});
exports.default = {
    prompt,
};
