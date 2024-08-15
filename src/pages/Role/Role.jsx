import { faCirclePlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Input } from 'antd'
import { useState } from 'react'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'

function Role() {
  const [listChilds, setListChilds] = useState({
    child0: { url: '', description: '' }
  })
  const handleOnchangeInput = (name, value, key) => {
    let _listChilds = _.cloneDeep(listChilds)
    _listChilds[key][name] = value
    setListChilds(_listChilds)
  }

  const handleAddNewInput = () => {
    let _listChilds = _.cloneDeep(listChilds)
    _listChilds[`child-${uuidv4()}`] = {
      url: '',
      description: ''
    }
    setListChilds(_listChilds)
  }
  const handleDeleteInput = (key) => {
    let _listChilds = _.cloneDeep(listChilds)
    delete _listChilds[key]
    setListChilds(_listChilds)
  }

  return (
    <>
      <div className='rounded-lg bg-white p-4'>
        <p className='text-2xl font-medium mb-4'>Add new Role</p>
        <div className=''>
          {Object.entries(listChilds).map(([key, value], index) => {
            return (
              <>
                <div key={`child-${key}`}>
                  <div className={`flex flex-row ${key}`}>
                    <div className='basis-1/3 mr-4'>
                      <span>URL</span>
                      <Input value={value.url} onChange={(e) => handleOnchangeInput('url', e.target.value, key)} />
                    </div>
                    <div className='basis-1/3 mr-4'>
                      <span>Description</span>
                      <Input value={value.description} onChange={(e) => handleOnchangeInput('description', e.target.value, key)} />
                    </div>
                    <div className='flex items-center pt-6 mb-6'>
                      <FontAwesomeIcon icon={faCirclePlus} className='text-2xl cursor-pointer mr-4 text-emerald-600' onClick={handleAddNewInput} />
                      {index > 0 && <FontAwesomeIcon icon={faTrash} className='text-2xl cursor-pointer text-red-500' onClick={() => handleDeleteInput(key)} />}
                    </div>
                  </div>
                </div>
              </>
            )
          })}
        </div>
        <Button type='primary'>Save</Button>
      </div>
    </>
  )
}

export default Role
