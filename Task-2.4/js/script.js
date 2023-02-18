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


document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form')
  form.addEventListener('submit', formSend)

  async function formSend(e) {
    e.preventDefault()

    let error = formValidate(form)

    if (error === 0) {
      alert('Done!')
    } else {
      alert('Please fill in the required fields!')
    }
  }


  function formValidate(form) {
    let error = 0
    let formReq = document.querySelectorAll('._req')

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index]
      hideError(input)

      if (input.classList.contains('_email')) {
        if (emailTest(input)) {
          showError(input)
          error++
        } 
      } else if (input.classList.contains('_name')) {
        if (input.value.length < 3) {
          showError(input)
          error++
        } else if (input.value.includes(' ')) {
          showError(input)
          error++
        }
      } else if (input.classList.contains('_pass')) {
        if (input.value.length < 6) {
          showError(input)
          error++
        }else if (input.value.includes(' ')) {
          showError(input)
          error++
        }
      } else if (input.classList.contains('_conf')) {
        const pass = document.querySelector('._pass')
        if (input.value !== pass.value) {
          showError(input)
          error++
        } else if (input.value === '') {
          showError(input)
          error++
        }
      } else {
        if (input.value === '') {
          showError(input)
          error++
        }
      }
    }
    return error
  }


  function showError(input) {
    input.classList.add('error')
    input.nextElementSibling.classList.add('active')
  }
  function hideError(input) {
    input.classList.remove('error')
    input.nextElementSibling.classList.remove('active')
  }
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
  }
})
