import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../reducers/reposReducer';
import { getRepos } from '../actions/repos';
import './main.scss';
import Repo from './repo/Repo';
import { createPages } from '../../utils/pageCreator';

function Main() {

  const dispatch = useDispatch();

  const repos = useSelector(state => state.repos.items);
  const isFetching = useSelector(state => state.repos.isFetching);
  const currentPage = useSelector(state => state.repos.currentPage);
  const totalCount = useSelector(state => state.repos.totalCount);
  const perPage = useSelector(state => state.repos.perPage);
  const isFetchError = useSelector(state => state.repos.isFetchError);

  const [searchValue, setSearchValue] = useState('');

  const pagesCount = Math.ceil(totalCount / perPage);

  const pages = [];

  createPages(pages, pagesCount, currentPage);

  useEffect(() => {
    dispatch(getRepos(searchValue, currentPage, perPage));
  }, [currentPage]);

  const searchHandler = () => {
    dispatch(setCurrentPage(1));
    dispatch(getRepos(searchValue, currentPage, perPage));
  };



  return (
    <div>
      { isFetchError &&
        <div class="alert alert-danger" role="alert">
          произошла ошибка, попробуйте снова
        </div>
      }
      <div className="search">
        <input
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          type="text"
          placeholder="Введите название репозитория"
          className="search-input"
        />
        <button
          onClick={() => searchHandler()}
          className="search-btn"
        >Найти</button>
      </div>
      {
        isFetching === false
          ?
          repos.map(repo => <Repo repo={repo} />)
          :
          <div className="fetching">

          </div>
      }
      <div className="pages">
        {
          pages.map((page, index) => <span
            key={index}
            className={currentPage == page ? 'current-page' : 'page'}
            onClick={() => dispatch(setCurrentPage(page))}
          >{page}</span>)
        }
      </div>

    </div>
  )
}

export default Main;
