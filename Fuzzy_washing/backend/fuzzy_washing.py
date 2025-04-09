from flask import Flask, request, jsonify
import skfuzzy as fuzz
import skfuzzy.control as ctrl
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Fuzzy Washing Machine API is running!"

dirt_level = ctrl.Antecedent(np.arange(0, 101, 1), 'dirt_level')
load_size = ctrl.Antecedent(np.arange(0, 11, 1), 'load_size')
water_temperature = ctrl.Antecedent(np.arange(20, 81, 1), 'water_temperature')

washing_time = ctrl.Consequent(np.arange(0, 101, 1), 'washing_time', defuzzify_method='centroid')
detergent_quantity = ctrl.Consequent(np.arange(0, 201, 1), 'detergent_quantity', defuzzify_method='centroid')

dirt_level['low'] = fuzz.trimf(dirt_level.universe, [0, 0, 50])
dirt_level['medium'] = fuzz.trimf(dirt_level.universe, [0, 50, 100])
dirt_level['high'] = fuzz.trimf(dirt_level.universe, [50, 100, 100])

load_size['small'] = fuzz.trimf(load_size.universe, [0, 0, 5])
load_size['medium'] = fuzz.trimf(load_size.universe, [0, 5, 10])
load_size['large'] = fuzz.trimf(load_size.universe, [5, 10, 10])

water_temperature['low'] = fuzz.trimf(water_temperature.universe, [20, 20, 35])
water_temperature['medium'] = fuzz.trimf(water_temperature.universe, [20, 35, 50])
water_temperature['high'] = fuzz.trimf(water_temperature.universe, [35, 50, 80])

washing_time['short'] = fuzz.trimf(washing_time.universe, [0, 0, 50])
washing_time['medium'] = fuzz.trimf(washing_time.universe, [0, 50, 100])
washing_time['long'] = fuzz.trimf(washing_time.universe, [50, 100, 100])

detergent_quantity['low'] = fuzz.trimf(detergent_quantity.universe, [0, 0, 50])
detergent_quantity['medium'] = fuzz.trimf(detergent_quantity.universe, [0, 50, 150])
detergent_quantity['high'] = fuzz.trimf(detergent_quantity.universe, [145, 200, 200])

rules = [
    ctrl.Rule(dirt_level['low'] & load_size['small'] & water_temperature['high'], (washing_time['short'], detergent_quantity['low'])),
    ctrl.Rule(dirt_level['low'] & load_size['medium'] & water_temperature['high'], (washing_time['short'], detergent_quantity['medium'])),
    ctrl.Rule(dirt_level['low'] & load_size['large'] & water_temperature['high'], (washing_time['medium'], detergent_quantity['medium'])),
    ctrl.Rule(dirt_level['low'] & load_size['small'] & water_temperature['low'], (washing_time['short'], detergent_quantity['low'])),
    ctrl.Rule(dirt_level['low'] & load_size['medium'] & water_temperature['low'], (washing_time['medium'], detergent_quantity['medium'])),
    ctrl.Rule(dirt_level['low'] & load_size['large'] & water_temperature['low'], (washing_time['medium'], detergent_quantity['medium'])),
    ctrl.Rule(dirt_level['low'] & load_size['small'] & water_temperature['medium'], (washing_time['short'], detergent_quantity['low'])),
    ctrl.Rule(dirt_level['low'] & load_size['medium'] & water_temperature['medium'], (washing_time['short'], detergent_quantity['medium'])),
    ctrl.Rule(dirt_level['low'] & load_size['large'] & water_temperature['medium'], (washing_time['medium'], detergent_quantity['medium'])),
     ctrl.Rule(dirt_level['medium'] & load_size['small'] & water_temperature['low'], (washing_time['medium'], detergent_quantity['low'])),
    ctrl.Rule(dirt_level['medium'] & load_size['medium'] & water_temperature['low'], (washing_time['medium'], detergent_quantity['medium'])),
    ctrl.Rule(dirt_level['medium'] & load_size['large'] & water_temperature['low'], (washing_time['long'], detergent_quantity['medium'])),
    ctrl.Rule(dirt_level['medium'] & load_size['small'] & water_temperature['high'], (washing_time['short'], detergent_quantity['medium'])),
    ctrl.Rule(dirt_level['medium'] & load_size['medium'] & water_temperature['high'], (washing_time['short'], detergent_quantity['medium'])),
    ctrl.Rule(dirt_level['medium'] & load_size['large'] & water_temperature['high'], (washing_time['medium'], detergent_quantity['medium'])),
    ctrl.Rule(dirt_level['medium'] & load_size['small'] & water_temperature['medium'], (washing_time['short'], detergent_quantity['medium'])),
    ctrl.Rule(dirt_level['medium'] & load_size['medium'] & water_temperature['medium'], (washing_time['short'], detergent_quantity['medium'])),
    ctrl.Rule(dirt_level['medium'] & load_size['large'] & water_temperature['medium'], (washing_time['medium'], detergent_quantity['medium'])),
    ctrl.Rule(dirt_level['high'] & load_size['small'] & water_temperature['high'], (washing_time['medium'], detergent_quantity['medium'])),
    ctrl.Rule(dirt_level['high'] & load_size['medium'] & water_temperature['high'], (washing_time['medium'], detergent_quantity['high'])),
    ctrl.Rule(dirt_level['high'] & load_size['large'] & water_temperature['high'], (washing_time['long'], detergent_quantity['high'])),
    ctrl.Rule(dirt_level['high'] & load_size['small'] & water_temperature['low'], (washing_time['medium'], detergent_quantity['medium'])),
    ctrl.Rule(dirt_level['high'] & load_size['medium'] & water_temperature['low'], (washing_time['long'], detergent_quantity['high'])),
    ctrl.Rule(dirt_level['high'] & load_size['large'] & water_temperature['low'], (washing_time['long'], detergent_quantity['high'])),
    ctrl.Rule(dirt_level['high'] & load_size['small'] & water_temperature['medium'], (washing_time['medium'], detergent_quantity['medium'])),
    ctrl.Rule(dirt_level['high'] & load_size['medium'] & water_temperature['medium'], (washing_time['long'], detergent_quantity['high'])),
    ctrl.Rule(dirt_level['high'] & load_size['large'] & water_temperature['medium'], (washing_time['long'], detergent_quantity['high']))
]

washing_ctrl = ctrl.ControlSystem(rules)
washing_sim = ctrl.ControlSystemSimulation(washing_ctrl)
@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    dirt_input = float(data['dirt_level'])
    load_input = float(data['load_size'])
    water_input = float(data['water_temperature'])
    washing_sim.input['dirt_level'] = dirt_input
    washing_sim.input['load_size'] = load_input
    washing_sim.input['water_temperature'] = water_input
    washing_sim.compute()
    return jsonify({
        'washing_time': round(washing_sim.output['washing_time'], 2),
        'detergent_quantity': round(washing_sim.output['detergent_quantity'], 2)
    })
if __name__ == '__main__':
    app.run(debug=True)
