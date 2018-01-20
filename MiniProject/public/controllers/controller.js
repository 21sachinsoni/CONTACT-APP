var module = angular.module("EmployeeDetail",[]);

module.controller("MyController",function($scope,$http){
    console.log("Hello..this is controller");
  
var refresh = function()
  {
    $http.get('/employeelist').then(function(response){
        console.log("Data Received");
         $scope.employeeList = response.data;
    });
  }
refresh();
   
    $scope.addEmployee = function(){
        console.log($scope.employee);
        $http.post('/employeelist',$scope.employee).then(function(response){
            console.log(response);
            $scope.employee.name="";
            $scope.employee.gender="";
            $scope.employee.city="";
            $scope.employee.salary="";
            refresh();
        });
    };
    
    
    $scope.removeEmployee = function(id){
        console.log(id);
        $http.delete('/employeelist/'+id).then(function(response){
            refresh();
        });
    }
    
    
    $scope.edit = function(id){
        console.log(id);
        $http.get('/employeelist/'+id).then(function(response){
            $scope.employee = response.data;
        });
    }
    
    $scope.updateEmployee = function(){
        console.log($scope.employee._id);
        $http.put('/employeelist/'+$scope.employee._id,$scope.employee).then(function(response){
            refresh();
            $scope.employee.name="";
            $scope.employee.gender="";
            $scope.employee.city="";
            $scope.employee.salary="";
            
        });
    }
});