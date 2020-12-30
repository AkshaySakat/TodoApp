<template>
  <div id="app">
     <div class="container" v-if="displayForm">
      <b-field label="Name" class="is-3">
            <b-input v-model="empName"></b-input>
        </b-field>
        <b-field label="Age" class="is-3">
            <b-input type="number" v-model="empAge"></b-input>
        </b-field>
         <b-field label="Salary">
            <b-input type="number" v-model="empSalary"></b-input>
        </b-field>
      <b-button type="is-success" @click="submitForm" v-if="editFlag">Update</b-button>&nbsp;
      <b-button type="is-success" @click="submitForm" v-else>Add</b-button>&nbsp;
      
      <b-button type="is-danger" @click="resetForm">Reset</b-button>
      <i class="fal fa-user-plus"> </i>
    </div>
    <h3><strong>Employee Details</strong></h3>
    <table class="table is-hoverable is-bordered">
      <thead>
        <th>Employee Id</th>
        <th>Employee Name</th>
        <th>Employee Age</th>
        <th>Employee Salary</th>
        <th>Add</th>
        <th>Update</th>
        <th>Delete</th>
      </thead>
      <tbody v-for="emp in employees" v-bind:key="emp.empid">
        <td>{{emp.empid}}</td>
        
        <td>{{emp.name}}</td>
        <td>{{emp.age}}</td>
        <td>{{emp.salary}}</td>
        <td><b-button type="is-info is-small is-rounded" @click="AddEmployee(emp)" >Add</b-button></td>
        <td><b-button type="is-success is-small is-rounded" @click="updateEmployee(emp)">Update</b-button></td>
        <td><b-button type="is-danger is-small is-rounded" @click="deleteEmployee(emp)">Delete</b-button></td>
      </tbody>
    </table>
    <br>
  </div>
</template>

<script>
import alertify from 'alertifyjs'
export default {
  name: 'App',
  data () {
    return {
      empId: '',
      empName: '',
      empAge:'',
      empSalary:'',
      employees: [],
      editFlag: false,
      displayForm: false
    }
  },
  created(){
    this.getEmployeeDetails()
  },
  methods: {
    // Get Employee details
    getEmployeeDetails: function() {
        this.$http.get('http://127.0.0.1:5000/api/allemp')
       .then(result=> result.json())
       .then((data)=>{
           this.employees = data;
       })
       .catch((err) => {
         console.log('err', err);
          alertify.warning('Error in Fetching');
       })
    },
    // Update Employee details
    updateEmployee:function(empDetails) {
        this.displayForm = true
        this.editFlag = true;
        this.empId = empDetails.empid
        this.empName = empDetails.name,
        this.empAge = empDetails.age,
        this.empSalary = empDetails.salary
    },
    // Add Employee
    AddEmployee:function() {
        this.empId = ''
        this.empName = ''
        this.empAge = ''
        this.empSalary = ''
      this.editFlag = false
      this.displayForm = true
    },
    submitForm: function() {
      console.log('Submit form');
      if(this.editFlag) {
        let requestObject ={
          empid: this.empId,
          name: this.empName,
          age: this.empAge,
          salary: this.empSalary
        }
        this.$http.put('http://127.0.0.1:5000/api/updateemp',requestObject)
       .then((result)=>{
         if(result.status && Number(result.status) === 200) {
          alertify.success('Employee updated successfully');
          this.getEmployeeDetails()
          this.displayForm = false
         } else {
          alertify.set('notifier','position', 'top-right');
          alertify.warning('Error in updating');
         }
       })
       .catch((err) => {
          console.log('Error', err)
          alertify.warning('Error in updating');
       })
      } else {
        let requestObject ={
          name: this.empName,
          age: this.empAge,
          salary: this.empSalary
        }
        this.$http.post('http://127.0.0.1:5000/api/addemp', requestObject)
       .then((result)=>{
           if(result.status && Number(result.status) === 200) {
          alertify.success('Employee created successfully');
          this.getEmployeeDetails()
          this.displayForm = false
         } else {
          alertify.warning('Error in creating');
         }
       })
       .catch((err) => {
         console.log('err', err);
          alertify.warning('Error in creating');
       })
      }
    },
    // Delete Employee
    deleteEmployee: function(empDetails) {
        this.$http.delete(`http://127.0.0.1:5000/api/deleteemp?empid=${empDetails.empid}`)
       .then((result)=>{
          if(result.status && Number(result.status) === 200) {
          alertify.success('Employee deleted successfully');
          this.getEmployeeDetails()
          this.displayForm = false
         } else {
          alertify.warning('Error in deleting');
         }
       })
       .catch((err) => {
           console.log('Error', err)
          alertify.warning('Error in deleting');
       })
    },
    resetForm: function() {
        this.empId = ''
        this.empName = ''
        this.empAge = ''
        this.empSalary = ''
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin: 30px;
}
</style>
