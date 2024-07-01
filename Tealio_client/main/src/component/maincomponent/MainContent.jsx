// MainContent.jsx

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProductDescription from '../ProductDescription/ProductDescription';
import ProductVariance from '../ProductVariance/ProductVariance';
import ProductInventory from '../ProductInventory/ProductInventory';
import ProductPrice from '../ProductPrice/ProductPrice';

const MainContent = () => {
    return (
        <div className="main-content">
            <Switch>
                <Route path="/product-description" component={ProductDescription} />
                <Route path="/product-variance" component={ProductVariance} />
                <Route path="/product-inventory" component={ProductInventory} />
                <Route path="/product-price" component={ProductPrice} />
            </Switch>
        </div>
    );
};

export default MainContent;
