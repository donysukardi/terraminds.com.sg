import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

class Schedule extends React.Component {
  render() {
    const { schedules, title } = this.props
    const simpleSchedule = schedules.some(x => x.day && x.times)

    if(simpleSchedule) {
      return (
        <section className="section section--small">
          <div className="wrapper">
            <h2 className="title-boxed">
              <span className="title-boxed__text">{title || 'Schedule'}</span>
            </h2>
            <ul className="list flex--3@lap-and-up  flex--large" style={{justifyContent: 'center'}}>
              {schedules.map((entry, idx) => (
                <li key={idx} className="list__item item-card-simple">
                  <div className="list__item-content item-card-simple__content">
                    <div className="item__header">{entry.day}</div>
                    <div className="item__body">
                      {entry.times.map(time => (
                        <div key={time.time} className="item__group">{time.time}</div>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )
    }

    const hasSubjects = schedules.some(x => x.subjects && x.subjects.length)
    const hasLink = schedules.some(x => !!x.url)

    const isWide = schedules.length === 4
    const listCls = isWide ? 'list--421 flex--center' : 'list--321'
    const wrapperCls = isWide ? 'wrapper-large' : 'wrapper'
    const bigTitle = schedules.every(x => x.name.length < 8)
    const contentCls = bigTitle ? 'item-card__content' : 'item-card-simple__content'

    const LinkComp = hasLink ? Link : 'div'

    return (
      <section className="section section--small">
        <div className={wrapperCls}>
          <h2 className="title-boxed">
            <span className="title-boxed__text">{title || 'Schedule'}</span>
          </h2>
          {hasLink && <h3 className="title-boxed">Click on the programmes to learn more!</h3>}
          <ul className={`list ${listCls}`}>
            {schedules.map((entry, idx) => (
              <li key={idx} className="list__item item-card-simple item-card--badge">
                <LinkComp to={entry.url} style={{color:'white', display: 'block', height: '100%', width: '100%'}}>
                  <div className={`list__item-content ${contentCls}`} style={{height: '100%'}}>
                    <div className="item__header">
                      <span>{entry.name}</span>
                      {hasSubjects && <div className="item-card__badge">
                        <span className="item-card__badge-heading">Age</span>
                        <span>{entry.age}</span>
                      </div>}
                    </div>
                    <div className="item__body">
                      {entry.schedule.map((schedule, index) => (
                        <div key={index} className="item__group">
                          <span>{schedule.day}</span>
                          <div className="item__sub">{schedule.time}</div>
                        </div>
                      ))}
                    </div>
                    {hasSubjects && <div className="item__footer">
                      {entry.subjects.map(subject => (
                        <div key={subject.subject} className="item__group">{subject.subject}</div>
                      ))}
                    </div>}
                  </div>
                </LinkComp>                    
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
  }
}

Schedule.propTypes = {
  schedules: PropTypes.array,
  title: PropTypes.string,
}

export default Schedule