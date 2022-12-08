import type { NextPage } from 'next';
import Head from 'next/head';
import {
  SectionButton,
  Title,
  SectionInput,
  SectionSwitch,
  SectionModal
} from '../components';

const Enter: NextPage = () => {
  return (
    <>

    <div className=" h">
      <img src="" />
      <div className="navbar">
        <div className="link-#-5">
          <div className="rectangle-copy" />
          <p className="text-2">Login</p>
        </div>
        <p className="text-3">About</p>
        <p className="text-4">Contact</p>
        <p className="text-5">Groupware</p>
      </div>
      <div className="group-2">
        <div className="rectangle-2" />
        <p className="text-6">Login</p>
        <p className="text-7">우리의 사명은 모든 사람이 다양한 지식 및 (예술)문화콘텐츠를
            경험해 지적/문화적/사회적으로 성장할 수 있도록
            도와드리는 것입니다.</p>
      </div>
      <div className="group-2-.-1">
        <div className="rectangle-2" />
        <p className="text-8">Sign in</p>
      </div>
      <img src="" />
    </div>
    </>
  );
};

export default Enter;
