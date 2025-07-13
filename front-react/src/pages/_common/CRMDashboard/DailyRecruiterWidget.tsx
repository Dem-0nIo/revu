import React, { useState, useEffect } from 'react';
import Card, {
  CardHeader,
  CardLabel,
  CardTitle,
  CardBody,
} from '../../../components/bootstrap/Card';


const DailyRecruiterWidget = () => {
  const [week, setWeek] = useState('actual');
  const [recruiters, setRecruiters] = useState([]);

  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const API_URL = process.env.REACT_APP_URL_API;
        const today = new Date();
        const day = today.getDay();
        const diff = today.getDate() - day + (day === 0 ? -6 : 1);
        const monday = new Date(today.setDate(diff));
        const sunday = new Date(today.setDate(monday.getDate() + 6));

        const startDate = new Date(
          week === 'actual' ? monday : new Date(monday.setDate(monday.getDate() - 7))
        ).toISOString().slice(0, 10);

        const endDate = new Date(
          week === 'actual' ? sunday : new Date(sunday.setDate(sunday.getDate() - 7))
        ).toISOString().slice(0, 10);

        const res = await fetch(`${API_URL}/api/influencer/by-recruiter?startDate=${startDate}&endDate=${endDate}`);
        const data = await res.json();
        setRecruiters(data);
      } catch (err) {
        console.error('❌ Error loading recruiter data:', err);
      }
    };

    fetchRecruiters();
  }, [week]);

  return (
    <Card stretch>
      <CardHeader>
        <CardLabel>
          <CardTitle tag="div" className="h5">
            Registros diarios por reclutador
          </CardTitle>
        </CardLabel>
      </CardHeader>
      <CardBody isScrollable>
        <div className="d-flex justify-content-end mb-3">
          <select
            className="form-select form-select-sm w-auto"
            value={week}
            onChange={(e) => setWeek(e.target.value)}
          >
            <option value="actual">Esta semana</option>
            <option value="anterior">Semana anterior</option>
          </select>
        </div>
        <div className="row g-2" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {recruiters.length > 0 ? (
            recruiters.map((r: any) => (
              <div key={r.id} className="col-12 d-flex justify-content-between">
                <span>{r.username}</span>
                <span className="fw-medium">{r.total}</span>
              </div>
            ))
          ) : (
            <div className="col-12 text-muted">No hay registros para esta semana</div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default DailyRecruiterWidget;