
import React from 'react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onClick: (course: Course) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  return (
    <div 
      onClick={() => onClick(course)}
      className="bg-white rounded-[2.5rem] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.08)] hover:shadow-[0_40px_60px_-20px_rgba(0,0,0,0.12)] transition-all duration-500 cursor-pointer overflow-hidden border border-slate-100 flex flex-col group transform hover:-translate-y-2"
    >
      <div className="relative h-60 overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="absolute top-5 left-5">
           <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-xl text-[10px] font-black text-indigo-600 shadow-sm uppercase tracking-widest border border-white/50">
             {course.level}
           </span>
        </div>
        
        <div className="absolute bottom-5 left-5 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
           <span className="text-white text-xs font-bold flex items-center gap-2">
             <i className="fas fa-play-circle text-lg"></i> Resume Track
           </span>
        </div>
      </div>
      
      <div className="p-8 flex-1 flex flex-col">
        <div className="text-[10px] font-black text-indigo-500 mb-2 uppercase tracking-[0.2em]">{course.category}</div>
        <h3 className="text-2xl font-black text-slate-900 mb-3 line-clamp-2 tracking-tight group-hover:text-indigo-600 transition-colors">
          {course.title}
        </h3>
        <p className="text-slate-500 text-sm mb-6 line-clamp-2 font-medium leading-relaxed">
          {course.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <i className="fas fa-star text-yellow-400 text-xs"></i>
              <span className="text-sm font-black text-slate-700">{course.rating}</span>
            </div>
            <div className="text-xs font-bold text-slate-400">
              {course.students.toLocaleString()} Students
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
             <i className="fas fa-chevron-right text-xs"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
