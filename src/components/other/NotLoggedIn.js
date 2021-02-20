import React from 'react';
import { Link } from "react-router-dom";
import { Button } from 'carbon-components-react';

export default function NotLoggedIn(props) {
  return (
    <div>
    <h2>You are not logged in</h2>
    <Link to="/login"> <Button>Login</Button> </Link>
    </div>
  );
}
