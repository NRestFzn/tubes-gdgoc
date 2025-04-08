import React from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';

type DashboardToolBarProps = {
  message?: string;
  onClick?: () => void;
};

const DashboardToolBar: React.FC<DashboardToolBarProps> = ({
  message,
  onClick,
}): React.ReactElement => {
  return (
    <div className="bg-muted/50 flex md:min-h-min p-4">
      <div className=" flex w-full max-w-3xl items-center space-x-2 gap-2">
        <Input type="Search" placeholder="Search" />
        <Button onClick={onClick} variant="outline">
          {message || 'add'}
        </Button>
      </div>
    </div>
  );
};

export default DashboardToolBar;
