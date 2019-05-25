import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Main from '../views/layouts/Main.jsx';

render(<BrowserRouter><Main /></BrowserRouter>, document.querySelector('#app'));