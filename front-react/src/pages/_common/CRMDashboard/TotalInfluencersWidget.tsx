// src/components/widgets/TotalInfluencersWidget.tsx
import React, { useEffect, useState } from 'react';
import Card, {
  CardActions,
  CardBody,
  CardHeader,
  CardLabel,
  CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import { demoPagesMenu } from '../../../menu';

const TotalInfluencersWidget = () => {
  const [total, setTotal] = useState<number>(0);

  const fetchTotalInfluencers = async () => {
    const API_URL = process.env.REACT_APP_URL_API;
    try {
      const response = await fetch(`${API_URL}/api/influencer/count`);
      const data = await response.json();
      setTotal(data.total || 0);
    } catch (error) {
      console.error('Error fetching total influencers:', error);
    }
  };

  useEffect(() => {
    fetchTotalInfluencers();
  }, []);

  return (
    <Card stretch>
      <CardHeader>
        <CardLabel>
          <CardTitle tag='div' className='h5'>
            Total registrados
          </CardTitle>
        </CardLabel>
      </CardHeader>
      <CardBody className='text-center'>
        <div className='display-5 fw-bold text-primary'>{total}</div>
        <div className='text-muted'>Influencers en la base de datos</div>
      </CardBody>
    </Card>
  );
};

export default TotalInfluencersWidget;