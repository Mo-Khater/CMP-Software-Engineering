var employees = [{ id: "1", name: "Mohamed Sayed" }];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employees });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const { id } = req.params;
  employees = employees.filter((employee) => {
    return employee.id != id;
  });
  res.json({
    statusCode: 204,
  });
};

// TODO
exports.createEmployee = async (req, res, next) => {
  const { name, id } = req.body;
  const employee = {
    name,
    id,
  };
  employees.push(employee);
  res.json({
    status: 201,
    data: employee,
  });
};
