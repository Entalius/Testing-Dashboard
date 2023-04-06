import React, { useState } from 'react';
import SchedulerOverview from './SchedulerOverview';
import MSISDNOverview from './MSISDNOverview';
import FilterMenu from './FilterMenu';

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('SchedulerOverview');

  const handleMenuItemClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div>
      <nav>
        <ul>
          <li onClick={() => handleMenuItemClick('SchedulerOverview')}>Scheduler Overview</li>
          <li onClick={() => handleMenuItemClick('MSISDNOverview')}>MSISDN Overview</li>
        </ul>
      </nav>
      {activeComponent === 'SchedulerOverview' && <SchedulerOverview />}
      {activeComponent === 'MSISDNOverview' && (
        <>
          <MSISDNOverview />
          <FilterMenu />
        </>
      )}
    </div>
  );
};

export default Dashboard;
