
const conversionRates = {
    linear: {
        'Feet (ft)': 0.3048, // to meters
        'Meters (m)': 1,
        'Inches (in)': 0.0254, // to meters
        'Centimeters (cm)': 0.01 // to meters
    },
    volume: {
        'Liters (L)': 1,
        'Milliliters (ml)': 0.001,
        'Gallons (gal)': 3.78541,
        'Ounces (oz)': 0.0295735
    },
    weight: {
        'Kilograms (kg)': 1,
        'Grams (g)': 0.001,
        'Pounds (lb)': 0.453592,
        'Ounces (oz)': 0.0283495
    },
    currency: {
        'USD ($)': 1, // You can replace this with actual rates from an API
        'EUR (€)': 0.85, // Conversion rates for demonstration
        'GBP (£)': 1.34,
        'JPY (¥)': 110.53,    // Japanese Yen
        'INR (Rup)': 73.50,     // Indian Rupee
        'AUD (AU$)': 1.37,      // Australian Dollar
        'CAD (C$)': 1.26,       // Canadian Dollar
        'NGN (#)': 0.0006500
    }
};

// Populate units based on selected category
function updateUnits() {
    const category = document.getElementById('category').value;
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');

    fromUnit.innerHTML = '';
    toUnit.innerHTML = '';

    Object.keys(conversionRates[category]).forEach(unit => {
        fromUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
        toUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
    });
}

// Convert the input value
function convert() {
    const category = document.getElementById('category').value;
    const inputValue = parseFloat(document.getElementById('inputValue').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    
    if (isNaN(inputValue)) {
        document.getElementById('result').textContent = "Please enter a valid number";
        return;
    }

    // Get the base unit (meters, liters, kilograms, USD)
    const baseValue = inputValue * conversionRates[category][fromUnit];
    const convertedValue = baseValue / conversionRates[category][toUnit];

    // Display the result with the unit sign
    document.getElementById('result').textContent = `${convertedValue.toFixed(2)} ${toUnit}`;
}

// Initialize the units dropdown on page load
updateUnits();




