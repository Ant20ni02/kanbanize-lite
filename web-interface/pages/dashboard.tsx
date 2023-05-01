import { useTranslation} from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetServerSideProps} from 'next'
import {useEffect, useState } from "react";
import { useRouter } from 'next/router'
import authRoute from '../components/authRoute';
import dynamic from 'next/dynamic';
import Dashboard from '../components/Dashboard'
import type { boardCard } from '../components/Dashboard';
import {urlCloud} from '../constants'
import dashboard from '../styles/Dashboards.module.css';
import login from '../styles/Login.module.css';

import Cookies from 'cookies'
const cookieCutter= require('cookie-cutter');

type Props = {}

interface Data {
  workspace_id: number,
  type: number,
  is_archived: number,
  name: string,
}

  type NextJsI18NConfig = {
    defaultLocale: string
    domains?: {
      defaultLocale: string
      domain: string
      http?: true
      locales?: string[]
    }[]
    localeDetection?: false
    locales: string[]
  }

  interface PropsResponse {
    data : Array<Data>
    _nextI18Next : NextJsI18NConfig
  }


const MyBoards = ( props: PropsResponse) => {

  if (typeof window !== 'undefined') {
    document.documentElement.style.setProperty('--dropdowncolor-', 'white');
    document.documentElement.style.setProperty('--dropdown-bg-', '#2666BE');
  }

    const [dropdown, setDropdown]=useState(false);
    const openCloseDropdown = () => {
        setDropdown(!dropdown);
    }


    const router = useRouter();
    const [value, setValue] = useState(0);
    const [boards, setBoards] = useState<Array<boardCard>>([]);

    const {t} = useTranslation('common');
    const LanguageDropdown = dynamic(import('../components/LanguageDropdown'),{ssr:false});
    const InterfaceDropdown= dynamic(import('../components/InterfaceDropdown'), {ssr:false});

    const workspaces = props.data;

    const handleChange = (event : any) => {
      setValue(event.target.value);
      getBoards(event.target.value);
      
    };


    const getBoards = async (boardid : number) => {
      const apikey = cookieCutter.get('apikey');
      const host = cookieCutter.get('host');
      const response = await fetch(urlCloud + `boards/${host}/${boardid}`, {
        method: "GET",
        headers: {
          "apikey": apikey,
        },
      });
      if(response.ok){
        const data: any = await response.json();
        if(!data.error){
          setBoards(data);
        }
        else{
          cookieCutter.set('apikey', '', { expires: new Date(0) })
          cookieCutter.set('host', '', { expires: new Date(0) })
          cookieCutter.set('email', '', { expires: new Date(0) })
          cookieCutter.set('userid', '', { expires: new Date(0) })
          router.replace({pathname: '/'});
        }
      }
      else{
        cookieCutter.set('apikey', '', { expires: new Date(0) })
        cookieCutter.set('host', '', { expires: new Date(0) })
        cookieCutter.set('email', '', { expires: new Date(0) })
        cookieCutter.set('userid', '', { expires: new Date(0) })
        router.replace({pathname: '/'});
      }
    }

    return (
        <>
        <div>
        
        <div className={dashboard.topBar}>
            <div className={dashboard.dropdownFragment}>
              <InterfaceDropdown  data={workspaces} name={"WORKSPACE"} getData={getBoards}/>
            </div>
            <div className={dashboard.languageDropdown}>
              <LanguageDropdown/>
            </div>
              
        </div>

            <div className={dashboard.grid}>
              {/*<div className={dashboard.title}>{t("myBoards.myBoards")}</div>*/}

              {boards.map((element: any, index)=> 
                    <Dashboard key={element.key} board_id={element.board_id} workspace_id={element.workspace_id} is_archived={element.is_archived} name={element.name} description={element.description} index={index} />
              )}

            </div>
 
        </div>
        </>
    )
}

  export const getServerSideProps: GetServerSideProps<Props> = async ({ req, res, locale }) => {
    const cookies = new Cookies(req, res)
    const apikey : any = cookies.get('apikey');
    const host = cookies.get('host');
    const response = await  fetch(urlCloud+`workSpaces/${host}`, {
            method: "GET",
            headers: {
                "apikey": apikey
            },
    })
    
    if(response.ok){
      const data: any = await response.json();
      if(!data.error){
        return {
          props: {
            ...(await serverSideTranslations(locale ?? 'en', [
              'common'
            ])),
            data}
        }
      }
      else{
        cookies.set('apikey');
        cookies.set('host');
        cookies.set('email');
        cookies.set('userid');

        return {
          redirect: {
            permanent: false,
            destination: "/",
          },
          props: {
            ...(await serverSideTranslations(locale ?? 'en', [
              'common'
            ]))}
        }
      }
      
    }
    else{
      cookies.set('apikey');
      cookies.set('host');
      cookies.set('email');
      cookies.set('userid');

      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
        props: {
          ...(await serverSideTranslations(locale ?? 'en', [
            'common'
          ]))}
      }
    }
    
  }
export default authRoute(MyBoards);