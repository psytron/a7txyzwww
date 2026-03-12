const myObject = {
    method() {
      console.log(this);
    }
};
  // Method invocation
myObject.method(); // logs myObject








const myObject = {
    myMethod(items) {
      console.log(this); // logs myObject
      const callback = () => {
        console.log(this); // logs myObject
      };
      items.forEach(callback);
    }
  };
  myObject.myMethod([1, 2, 3]); 

      hashCode(s) {
            for(var i = 0, h = 0; i < s.length; i++)
                h = Math.imul(31, h) + s.charCodeAt(i) | 0;
            return h;
    }