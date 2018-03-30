import "./../less/style.less";
import Vue from "./vue.js";
import {factorizeString} from "./factorize.js";
import calculateExpression from "./calculateExpr.js"

const maxScreenLength = 15;
const exprScreenLength = 30;
let vm = new Vue({
	el: "#app",
	data: {
		expr: [],
		inputText: "0",
		memory: 0,
	},
	computed: {
		screenText: function() {
			return this.inputText;
		},
		additionScreenText: function() {
			return (this.expr.join('')+this.inputText).slice(-exprScreenLength);
			// return this.valueOfExpr;
		},
		inputNumber: function() {
			const n = Number.parseFloat(this.inputText);
			return isNaN(n) ? 0 : n;
		},
		valueOfExpr: function() {
			const expr = this.expr.map(el=>{
				const number = Number.parseFloat(el);
				if (isNaN(number))
					return el;
				return number;
			});
			if (typeof expr[expr.length-1] !== "number") {
				expr.splice(expr.length-1, 1);
			}
			return calculateExpression(expr);
		}
	},
	methods: {
		applyFunction: function(f, oldValue = this.inputNumber) {
			let value = f(oldValue);
			this.setInputTextByValue(value);
		},
		getSqrt: function() {
			const oldValue = this.inputNumber;
			if (oldValue >= 0) {
				this.applyFunction(x=>Math.sqrt(x), oldValue);
			}
		},
		addOperation: function(op) {
			this.expr.push(this.inputText);
			this.expr.push(op);
			this.inputText = "0";
		},
		getOneDivBy: function() {
			const oldValue = Number.parseFloat(this.inputText, "ru-RU");
			if (Math.abs(oldValue) > 1e-12) {
				this.applyFunction((x)=>{ return 1/x});
			}
		},
		addDigit: function(dig) {
			if (this.inputText == "0" || this.inputText == "∞")
				this.inputText = dig.toString();
			else if (this.inputText.length < maxScreenLength)
				this.inputText += dig;
		},
		addComma: function() {
			if (this.inputText.indexOf(".") == -1 && this.inputText.length < maxScreenLength-1)
				this.inputText += ".";
		},
		reverseSign: function() {
			if (this.inputText[0] != "-" && this.inputText.length < maxScreenLength){
				this.inputText = "-"+this.inputText;
			} else {
				if (this.inputText[0] == "-")
					this.inputText = this.inputText.slice(1);
			}
		},
		removeDigit: function() {
			this.inputText = this.inputText.slice(0, -1);
			if (this.inputText.length == 0)
				this.inputText = "0";
		},
		removeNumber: function() {
			this.inputText = "0";
		},
		clearExpression: function() {
			this.inputText = "0";
			this.expr = [];
		},
		setInputTextByValue: function(value) {
			this.inputText = value.toLocaleString("en-EN", {maximumSignificantDigits: maxScreenLength-2, useGrouping: false});
		},
		getPercents: function(value) {
			this.applyFunction((v)=>{
				return v / 100 * this.valueOfExpr;
			});

		},
		memoryClear: function() {
			this.memory = 0;
		},
		memoryRead: function() {
			this.setInputTextByValue(this.memory);
		},
		memorySet: function() {
			this.memory = this.inputNumber;
		},
		memoryAdd: function() {
			this.memory += this.inputNumber;
		},
		memorySubstract: function() {
			this.memory -= this.inputNumber;
		},
		equal: function() {
			this.expr.push(this.inputText);
			this.setInputTextByValue(this.valueOfExpr);
			this.expr = [];
		}


	}
});