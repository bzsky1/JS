function fun1() {
  
  function k(res) {
    if (res < 999) {
      return res;
    } else if (res > 999) {
      result = res / 1000 + "K";
      return result;
    };
  };

  var rng = document.getElementById('amount');
  var p = document.getElementById('res');
  p.innerHTML = k(rng.value);
};


class Validator {
  constructor(form, fields) {
    this.form = form
    this.fields = fields
  }


  init = () => {
    this.onSubmit()
    this.onEntry()
  }


  onSubmit = () => {
    this.form.addEventListener('submit',(e) => {
      e.preventDefault()
      this.fields.forEach((field) => {
        const input = document.querySelector(`._${field}`)
        this.validateField(input)
      })

    })
  }


  onEntry = () => {
    this.fields.forEach((field) => {
      const input = document.querySelector(`._${field}`)

      input.addEventListener('input', () => {
        this.validateField(input)
      })
    })
  }


  validateField = (input) => {
    this.hideError(input)

    if (input.classList.contains('_email')) {
      if (this.emailTest(input)) {
        this.showError(input)
      } 
    } else if (input.classList.contains('_name')) {
      if (input.value.length < 3) {
        this.showError(input)
      } else if (input.value.includes(' ')) {
        this.showError(input)
      }
    } else if (input.classList.contains('_lname')) {
      if (input.value.length < 3) {
        this.showError(input)
      } else if (input.value.includes(' ')) {
        this.showError(input)
      }
    } else if (input.classList.contains('_pass')) {
      if (input.value.length < 6) {
        this.showError(input)
      }else if (input.value.includes(' ')) {
        this.showError(input)
      }
    } else if (input.classList.contains('_conf')) {
      const pass = document.querySelector('._pass')
      if (input.value !== pass.value) {
        this.showError(input)
      } else if (input.value === '') {
        this.showError(input)
      }
    } else {
      if (input.value === '') {
        this.showError(input)
      }
    }
  }
 

  showError = (input) => {
    input.classList.add('error')
    input.nextElementSibling.classList.add('active')
  }
  hideError = (input) => {
    input.classList.remove('error')
    input.nextElementSibling.classList.remove('active')
  }
  emailTest = (input) => {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
  }
}


const form = document.querySelector('#form')
const fields = ['name', 'lname', 'email', 'pass', 'conf']


const validator = new Validator(form, fields)
validator.init()