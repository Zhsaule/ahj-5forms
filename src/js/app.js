import Tooltip from './tooltip';

const form = document.querySelector('.form');

const errors = {
  login: {
    valueMissing: 'Представьтесь, пожалуйста!',
  },
  email: {
    valueMissing: 'Нам потребуется электропочта...',
    typeMismatch: 'А это точно электропочта?',
  },
  'credit-card': {
    valueMissing: 'Предоставьте нам данные своей кредитной карты, это безопасно, честно',
    patternMismatch: 'Не удалось снять данные с вашей кредитной карты :(',
  },
};

const tooltipFactory = new Tooltip();
let actualMessages = [];

const showTooltip = (message, el) => {
  actualMessages.push({
    name: el.name,
    id: tooltipFactory.showTooltip(message, el),
  });
};

const getError = (el) => {
  const errorKey = Object.keys(ValidityState.prototype).find((key) => {
    if (!el.name) return null;
    if (key === 'valid') return false;

    return el.validity[key];
  });

  if (!errorKey) return null;

  return errors[el.name][errorKey];
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  actualMessages.forEach((message) => tooltipFactory.removeTooltip(message.id));
  actualMessages = [];

  // if (form.checkValidity()) {
  //   console.log('valid');
  // } else {
  //   console.log('invalid');
  // }

  const { elements } = form;

  [...elements].some((elem) => {
    const error = getError(elem);

    if (error) {
      showTooltip(error, elem);
      return true;
    }
    return false;
  });

  // console.log('submit');
});

const elementOnBlur = (e) => {
  const el = e.target;

  const error = getError(el);
  if (error) {
    showTooltip(error, el);
  } else {
    const currentErrorMessage = actualMessages.find((item) => item.name === el.name);

    if (currentErrorMessage) {
      tooltipFactory.removeTooltip(currentErrorMessage.id);
    }
  }

  el.removeEventListener('blur', elementOnBlur);
};

[...form.elements].forEach((el) => {
  el.addEventListener('focus', () => {
    el.addEventListener('blur', elementOnBlur);
  });
});

window.addEventListener('beforeunload', () => {
  const formData = {};

  form.elements.forEach((el) => {
    if (!el.name) {
      return;
    }

    formData[el.name] = el.value;
  });

  localStorage.setItem('formData', JSON.stringify(formData));
});

document.addEventListener('DOMContentLoaded', () => {
  let formData;

  // const json = localStorage.getItem('formData');
  // try {
  //   formData = JSON.parse(json);
  // } catch (error) {
  //   console.log(error);
  // }

  if (formData) {
    Object.keys(formData).forEach((key) => {
      form.querySelector(`[name="${key}"]`).value = formData[key];
    });
  }
});
