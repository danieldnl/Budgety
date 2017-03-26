//BUDGET CONTROLLER
var budgetController = (function () {
	
	var Expense = function (id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value; 
	};

	var Income = function (id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value; 
	};

	var data = {
		allItems: {
			exp: [],
			inc: []
		},

		totals: {
			exp: 0,
			inc: 0
		}
	};

	return {
		addItem: function (type, des, val) {
			var newItem;
			var id = 0;

			//Create new ID
			if (data.allItems[type].length > 0) {
				id = data.allItems[type][data.allItems[type].length - 1].id + 1;
			}

			//Create new item based on 'inc' or 'exp' type
			if (type === 'exp') {
				newItem = new Expense(id, des, val);
			} else if (type === 'inc') {
				newItem = new Income(id, des, val);
			}

			//Push it into our data structure
			data.allItems[type].push(newItem);

			//Return new element
			return newItem;
		},
		testing: function () {
			console.log(data);
		}
	}

})();

//UI CONTROLLER
var UIController = (function() {

	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn'
	}

	return {
		getInput: function () {
			return {
				type: document.querySelector(DOMstrings.inputType).value,
				description: document.querySelector(DOMstrings.inputDescription).value,
				value: document.querySelector(DOMstrings.inputValue).value
			}
		},

		getDOMstrings: function () {
			return DOMstrings;
		}
	}

})();

//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

	var setupEventListeners = function () {
		var DOM = UICtrl.getDOMstrings();

		document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

		document.addEventListener('keypress', function (event) {
			if (event.keycode === 13 || event.which === 13) {
				ctrlAddItem();
			}
		});
	}

	var ctrlAddItem = function () {
		var input, newItem;

		//1. Get the file input data
		var input = UICtrl.getInput();
		console.log(input);

		//2. Add the item to the BudgetController
		newitem = budgetCtrl.addItem(input.type, input.description, input.value);
		
		//3. Add the item to the UI
		
		//4. Calculate the Budget
		
		//5. Display the Budget on the UI
	}

	return {
		init: function () {
			console.log('App has started');
			setupEventListeners();
		}
	}

})(budgetController, UIController);

controller.init();