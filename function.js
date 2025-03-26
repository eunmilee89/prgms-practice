// 함수는 실제 매개변수가 될 수 있다, 함수는 함수의 반환값이 될 수 있다.
function foo(arg) {
  return arg;
}

function bar() {
  console.log('bar');
}

foo(bar)(); // 'bar'

// -----------------

// 함수는 할당명령문의 대상이 될 수 있다.
const foo1 = function (arg) {
  return arg;
};

foo1(1); // 1을 반환

// -----------------

// 기본값 매개변수를 넣을 수 있다.
function foo2(arg = 1) {
  console.log(arg);
}

foo2(); // '1'

// -----------------

// 나머지 매개변수를 넣을 수 있다.
function foo3(arg, ...rest) {
  console.log(rest);
}

foo3(1, 2, 3, 4); // [2, 3, 4]

// -----------------

// argument 객체
function foo4(arg) {
  console.log(arguments);
}

foo4(1, 2, 3, 4); // [Arguments] { '0': 1, '1': 2, '2': 3, '3': 4 }

// -----------------

// 함수 선언문
function foo5() {
  console.log('foo5');
}

foo5(); // 'foo5'

// -----------------

// 함수 표현식
const foo6 = function () {
  console.log('foo6');
};

foo6(); // 'foo6'

// -----------------

// Function 생성자 함수
const foo7 = new Function("console.log('foo7')");

foo7(); // 'foo7'

// -----------------

// 화살표 함수 표현식
const foo8 = () => {
  console.log('foo8');
};

foo8(); // 'foo8'

// -----------------

// IIFE (즉시 실행 함수)
(function foo9() {
  console.log('foo9');
})();

// -----------------

// 재귀 함수
function foo10(arg) {
  if (arg === 3) return;
  console.log('foo10>>>>' + arg);

  foo10(arg + 1);
}

foo10(1);

// -----------------

// 중첩 함수
function foo11(arg) {
  function bar() {
    console.log(arg);
  }
  bar();
}

foo11('foo11');

// -----------------

// 콜백 함수

function foo12(arg) {
  arg();
}

foo12(() => {
  console.log('foo12');
});
