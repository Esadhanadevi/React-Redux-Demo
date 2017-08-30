import React from 'react';

class App1 extends React.Component {
   render() {
      const arr = ['1111', '2222', '3333'];
      return (
         <div>
            Contact
            {arr[2]}
         </div>
      );
   }
}

export default App1;
