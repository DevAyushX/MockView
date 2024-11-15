"use client"
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';

function StartInterview({params}) {

    const [interviewData,setInterviewData]=useState();
    const [mockInterviewQuestion,setMockInterviewQuestion]=useState();
    const [activeQuestionIndex,setActiveQuestionIndex]=useState(0);
    useEffect(()=>{
        GetInterviewDetails();
    },[]);

    /**
     * Used to Get Interview Details by MockId/Interview Id
     */
    const GetInterviewDetails = async () => {
      const result = await db.select().from(MockInterview)
          .where(eq(MockInterview.mockId, params.interviewId));
  
      const jsonMockResp = JSON.parse(result[0].jsonMockResp);
  
      // Check if jsonMockResp is an array before setting it
      if (Array.isArray(jsonMockResp)) {
          setMockInterviewQuestion(jsonMockResp);
      } else {
          console.error('Expected an array but got:', typeof jsonMockResp, jsonMockResp);
          setMockInterviewQuestion([]); // Set as empty array to prevent map errors
      }
      
      setInterviewData(result[0]);
  };
  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            {/* Questions  */}
            <QuestionsSection 
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            />

            {/* Video/ Audio Recording  */}
            <RecordAnswerSection
             mockInterviewQuestion={mockInterviewQuestion}
             activeQuestionIndex={activeQuestionIndex}
             interviewData={interviewData}
            />
        </div>
        <div className='flex justify-end gap-6'>
          {activeQuestionIndex>0&&  
          <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
          {activeQuestionIndex!=mockInterviewQuestion?.length-1&& 
           <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
          {activeQuestionIndex==mockInterviewQuestion?.length-1&&  
          <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
          <Button >End Interview</Button>
          </Link>}


        </div>
    </div>
  )
}

export default StartInterview