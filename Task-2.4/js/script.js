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


  init() {
    this.vOnSubm()
    this.vOnEnt()
  }


  vOnSubm() {
    let self = this

    this.form.addEventListener('submit', function(e) {
      e.preventDefault()
      self.fields.forEach(function (field) {
        const input = document.querySelector(`._${field}`)
        self.vField(input)
      })

    })
  }


  vOnEnt() {
    let self = this
    this.fields.forEach(function(field) {
      const input = document.querySelector(`._${field}`)

      input.addEventListener('input', () => {
        self.vField(input)
      })
    })
  }


  vField(input) {
    this.hideError(input)
    let self = this

    if (input.classList.contains('_email')) {
      if (self.emailTest(input)) {
        self.showError(input)
      } 
    } else if (input.classList.contains('_name')) {
      if (input.value.length < 3) {
        self.showError(input)
      } else if (input.value.includes(' ')) {
        self.showError(input)
      }
    } else if (input.classList.contains('_lname')) {
      if (input.value.length < 3) {
        self.showError(input)
      } else if (input.value.includes(' ')) {
        self.showError(input)
      }
    } else if (input.classList.contains('_pass')) {
      if (input.value.length < 6) {
        self.showError(input)
      }else if (input.value.includes(' ')) {
        self.showError(input)
      }
    } else if (input.classList.contains('_conf')) {
      const pass = document.querySelector('._pass')
      if (input.value !== pass.value) {
        self.showError(input)
      } else if (input.value === '') {
        self.showError(input)
      }
    } else {
      if (input.value === '') {
        self.showError(input)
      }
    }
  }
 

  showError(input) {
    input.classList.add('error')
    input.nextElementSibling.classList.add('active')
  }
  hideError(input) {
    input.classList.remove('error')
    input.nextElementSibling.classList.remove('active')
  }
  emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
  }
}


const form = document.querySelector('#form')
const fields = ['name', 'lname', 'email', 'pass', 'conf']


const vForm = new Validator(form, fields)
vForm.init()