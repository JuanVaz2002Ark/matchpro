// src/pages/api/CVs.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import matchprodb from '../../server/lib/dt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method === 'PATCH') {
    try {

      const { candidateId, jobId, reason, comentario } = req.body;
      
      // console.log('Received IDs:', req.body);

      // Validate required fields
      if (!candidateId) {
        return res.status(404).json({ error: 'candidateId is required' });
      }

      if (!jobId) {
        return res.status(404).json({ error: 'jobId is required' });
      }
      
      const [data] = await matchprodb.query<any>(
        `SELECT * FROM applications WHERE jobId=? AND candidateId=?`,
        [
          jobId,
          candidateId,
        ]
      );
      
      if (!data) {
        return res.status(404).json({ error: 'Application Data not found' });
      }
      // console.log(data)

      const applicationId = data[0].id;
      const responsedAt = new Date().toISOString().split('T')[0];


      // Insert into DB
      const [result] = await matchprodb.query<any>(
        `INSERT INTO rejected_applications (rejected_application_id, candidate_id, job_id, reason, responsedAt, comentario) VALUES 
        (?, ?, ?, ?, ?, ?)`,
        [
          applicationId,
          candidateId,
          jobId,
          reason,
          responsedAt,
          comentario
        ]
      );

      if (!result) {
        return res.status(424).json({ error: 'Failed to reject an application' });
      }

      const [rejected] = await matchprodb.query<any>(
        `UPDATE applications 
        SET 
          status = ?
        WHERE id = ?`,
        [
          "rejected",
          applicationId
        ]
      );

      console.log('Application rejected successfully:', rejected);
      return res.status(202).json({ message: 'Application rejected successfully', id: (rejected as any).insertId });
    } catch (error) {
      console.error('Error rejecting an application:', error);
      return res.status(500).json({ error: 'Failed to reject an application', details: error.message });
    }
  }
  else if (req.method === 'POST') {
    try {

      const { candidateId, jobId } = req.body;
      
      console.log('Received IDs:', req.body);

      // Validate required fields
      if (!candidateId) {
        return res.status(400).json({ error: 'candidateId is required' });
      }

      if (!jobId) {
        return res.status(400).json({ error: 'jobId is required' });
      }

      const appliedAt = new Date().toISOString().split('T')[0];

      // Insert into DB
      const [result] = await matchprodb.query<any>(
        `INSERT INTO applications (jobId, candidateId, status, appliedAt)
          VALUES (?, ?, ?, ?)`,
        [
          jobId,
          candidateId,
          "new",
          appliedAt
        ]
      );

      console.log('Application saved successfully:', result);
      return res.status(201).json({ message: 'Application saved successfully', id: (result as any).insertId });
    } catch (error) {
      console.error('Error saving an application:', error);
      return res.status(500).json({ error: 'Failed to save an application', details: error.message });
    }
  }
  else if (req.method === 'GET') {
    const script_applications = `SELECT * FROM matchprodb.applications`;

    try{


     const [rows_applications] = await matchprodb.query<any[]>(script_applications);
   //   const [rows_company_info] = await matchprodb.query<any[]>('SELECT * FROM company_info');
     
     // // Group by client ID
     const applicationMap: Record<number, any> = {};

     for (const application of rows_applications) {
       const applicationID = application.id
       if(!applicationMap[applicationID]) { 
         applicationMap[applicationID]= {
           appliedAt: application.appliedAt,
           status: application.status,
           candidateId: application.candidateId,
           jobId: application.jobId,
           id: applicationID
         }
       }
     }

     res.status(202).json(Object.values(applicationMap));
   } catch (error) {
     console.error('Error fetching jobs:', error);
     res.status(500).json({ error: 'Failed to fetch jobs' });
   }
 }

  res.setHeader('Allow', ['GET', 'POST', 'PATCH']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}