import React from 'react';

class App1 extends React.Component {
   render() {
      const arr = ['1111', '2222', '3333'];
      return (
         <div>
            About
            {arr[1]}
         </div>
      );
   }
}

export default App1;
