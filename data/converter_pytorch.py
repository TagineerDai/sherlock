import torch, torchvision, json
from pprint import pprint

def parse(current_model, depth=0, father_name="", current_id=0):
    graph = []
    "This module will list all the parameters recursively."
    current_depth = "".join(["    " for i in range(depth) ]) if depth!=0 else ""
    if father_name == "":
        father = ""
    else:
        father = father_name + "."
    for module_name in current_model._modules:
        current_module = current_model._modules[module_name]
        node_type = str(type(current_module))[8:-2]
        node_name = node_type.strip().split(".")[-1]
        print(current_depth + father+module_name+" ["+node_name+"]")
        parameter_list = list(current_module._parameters.keys())
        dict_parameter = []
        if not parameter_list:
            sub_module = parse(current_module, depth+1, father+node_name, current_id)
            dict_parameter.append({
                "k" : "module",
                "v" : sub_module
            })
        else:
            for param_name in parameter_list:
                try:
                    print(current_depth + "|-" + param_name, "requries_grad is", str(current_module._parameters[param_name].requires_grad)+".")
                except:
                    print(current_depth + "|-" + param_name, "is not exist(NoneType).")
            print(current_depth + "|--------------------------------")
        for k in current_module.__dict__.keys():
            if k[0] is not "_": # k is a parameter
                print(current_depth + "|-" + k, "=", str(current_module.__dict__[k]))
                dict_parameter.append({
                    "k":k,
                    "v":str(current_module.__dict__[k])
                })
        current_id = current_id + 1
        graph.append({
            "id": current_id,
            "title": module_name,
            "discription": node_name,
            "params": dict_parameter,
            "maxPoints":2,
            "depends": [current_id-1, ]
        })
    return graph
if __name__ == '__main__':
    current_model = torchvision.models.resnet18(True)
    graph = parse(current_model)
    pprint({"skills": graph})
    data = {"skills": graph}
    with open("example.json", "w") as f:
        json.dump(data, f)