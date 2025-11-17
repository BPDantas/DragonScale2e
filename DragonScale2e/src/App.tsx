import { useEffect, useState } from 'react'
import { lookupTable } from './Tables';
import { findIndex, transformStat,ShowNumber } from './Functions';
import './App.css'

function App() {

  const [statsB, setStatsB] = useState({
    levelB:0,
    perceptionB:0,
    armorB:0,
    skillB:0,
    fortitudeB:0,
    reflexB:0,
    willB:0,
    healthB:0,
    resistanceB:0,
    weaknessB:0,
    strikeB:0,
    spellAtkB:8,
    spellDcB:0,
    strengthB:0,
    dexterityB:0,
    constitutionB:0,
    intelligenceB:0,
    wisdomB:0,
    charismaB:0,
    damageQtB:1,
    damageDieB:3.5,
    damageBonB:0,
    unlimitedDmg:false,
    limitedDmg:false,
  })

  const [statsN, setStatsN] = useState({

    levelN:0,
    strengthN:0,
    dexterityN:0,
    constitutionN:0,
    intelligenceN:0,
    wisdomN:0,
    charismaN:0,
    perceptionN:0,
    armorN:0,
    skillN:0,
    fortitudeN:0,
    reflexN:0,
    willN:0,
    healthN:0,
    resistanceN:0,
    weaknessN:0,
    strikeN:0,
    damageN:"1d4+1",
    spellAtkN:8,
    spellDcN:0,
    unlimitedDmg:"Nda",
    limitedDmg:"",
  })

  useEffect(()=>{

    //attributes
    let strN = transformStat(lookupTable.attributes,statsB.strengthB,statsB.levelB,statsN.levelN)
    let dexN = transformStat(lookupTable.attributes,statsB.dexterityB,statsB.levelB,statsN.levelN)
    let conN = transformStat(lookupTable.attributes,statsB.constitutionB,statsB.levelB,statsN.levelN)
    let intN = transformStat(lookupTable.attributes,statsB.intelligenceB,statsB.levelB,statsN.levelN)
    let wisN = transformStat(lookupTable.attributes,statsB.wisdomB,statsB.levelB,statsN.levelN)
    let chaN = transformStat(lookupTable.attributes,statsB.charismaB,statsB.levelB,statsN.levelN)

    //perception
    let percN = transformStat(lookupTable.perception,statsB.perceptionB,statsB.levelB,statsN.levelN)

    //armor
    let armN = transformStat(lookupTable.armor,statsB.armorB,statsB.levelB,statsN.levelN)

    //skill
    let skiN = transformStat(lookupTable.skill,statsB.skillB,statsB.levelB,statsN.levelN)
    //saves
    let fortN = transformStat(lookupTable.saves,statsB.fortitudeB,statsB.levelB,statsN.levelN)
    let refN = transformStat(lookupTable.saves,statsB.reflexB,statsB.levelB,statsN.levelN)
    let wilN = transformStat(lookupTable.saves,statsB.willB,statsB.levelB,statsN.levelN)

    //health
    let heaN = transformStat(lookupTable.health,statsB.healthB,statsB.levelB,statsN.levelN);

    //resistances and weakness
    let resN = (statsB.resistanceB>0) ? transformStat(lookupTable.resWeak,statsB.resistanceB,statsB.levelB,statsN.levelN):0;
    let weaN = (statsB.weaknessB>0) ? transformStat(lookupTable.resWeak,statsB.weaknessB,statsB.levelB,statsN.levelN):0;

    //strike
    let stkN = transformStat(lookupTable.strike,statsB.strikeB,statsB.levelB,statsN.levelN);
    let avgDam = (statsB.damageQtB * statsB.damageDieB) + statsB.damageBonB;
    let Dam = lookupTable.damageValue[statsN.levelN+1][findIndex(avgDam,lookupTable.damageAvg[statsB.levelB+1])]
    //spell attack

    let sAkN = transformStat(lookupTable.spell,statsB.spellAtkB,statsB.levelB,statsN.levelN)-8;
    if (sAkN<=0){
      sAkN=0;
    }
    let sDcN = transformStat(lookupTable.spell,statsB.spellDcB,statsB.levelB,statsN.levelN);

    //areaDamage
    let unlN = (statsB.unlimitedDmg) ? lookupTable.areaDmg[statsN.levelN+1][0] : "";
    let lmtN = (statsB.limitedDmg) ? lookupTable.areaDmg[statsN.levelN+1][1] : "";

    setStatsN((prev) => ({
      ...prev,
      strengthN:strN,
      dexterityN:dexN,
      constitutionN:conN,
      intelligenceN:intN,
      wisdomN:wisN,
      charismaN:chaN,
      perceptionN:percN,
      armorN:armN,
      skillN:skiN,
      fortitudeN:fortN,
      reflexN:refN,
      willN:wilN,
      healthN:heaN,
      resistanceN:resN,
      weaknessN:weaN,
      strikeN:stkN,
      damageN:Dam,
      spellAtkN:sAkN,
      spellDcN:sDcN,
      unlimitedDmg:unlN,
      limitedDmg:lmtN,
    }));
  },[
    statsB,
    statsN.levelN,
  ]
)

  return (

    <div className='main'>
      <div className='main'>
        <h1 className='banner'>Dragon Scale 2e</h1>
        <p className="subtitle">Scales creatures to any level</p>
      </div>
      <div className='mainRow'>
        <div className='card'>
          <h1 className='title titleRed'>Base Stats</h1>
          <div className='line section'>
            <p>Level:</p>
            <input type="number" value={statsB.levelB} min={-1} max={24} onChange={(e) => setStatsB((prev)=>({...prev, levelB:parseInt(e.target.value)}))}/>
          </div>
          <h2 className='chapterRed'>Stats</h2>
          <div className='section'>

              <div className='line dashed'>
                <p>Perception:</p>
                <input type="number" value={statsB.perceptionB} onChange={(e) => setStatsB((prev)=>({...prev, perceptionB:parseInt(e.target.value)||0}))}/>
              </div>

              <div className='line dashed'>
                <p>Skill:</p>
                <input type="number" value={statsB.skillB} onChange={(e) => setStatsB((prev)=>({...prev, skillB:parseInt(e.target.value)||0}))}/>
              </div>
              <div className='line att'>
                <p>Str:</p>
                <input type="number" min={-5} value={statsB.strengthB} onChange={(e) => setStatsB((prev)=>({...prev, strengthB:parseInt(e.target.value)||0}))}/>
                <p>Dex:</p>
                <input type="number" min={-5} value={statsB.dexterityB} onChange={(e) => setStatsB((prev)=>({...prev, dexterityB:parseInt(e.target.value)||0}))}/>
                <p>Con:</p>
                <input type="number" min={-5} value={statsB.constitutionB} onChange={(e) => setStatsB((prev)=>({...prev, constitutionB:parseInt(e.target.value)||0}))}/>
              </div>
              <div className='line att'>
                <p>Int:</p>
                <input type="number" min={-5} value={statsB.intelligenceB} onChange={(e) => setStatsB((prev)=>({...prev, intelligenceB:parseInt(e.target.value)||0}))}/>
                <p>Wis:</p>
                <input type="number" min={-5} value={statsB.wisdomB} onChange={(e) => setStatsB((prev)=>({...prev, wisdomB:parseInt(e.target.value)||0}))}/>
                <p>Cha:</p>
                <input type="number" min={-5} value={statsB.charismaB} onChange={(e) => setStatsB((prev)=>({...prev, charismaB:parseInt(e.target.value)||0}))}/>
              </div>
          </div>
          <h2 className='chapterRed'>Defenses</h2>

          <div className='section'>

            <div className='line dashed'>
                <p>AC:</p>
                <input value={statsB.armorB} onChange={(e) => setStatsB((prev)=>({...prev, armorB:parseInt(e.target.value)||0}))}/>
              <p>Fort:</p>
              <input type="number" value={statsB.fortitudeB} onChange={(e) => setStatsB((prev)=>({...prev, fortitudeB:parseInt(e.target.value)||0}))}/>

                <p>Ref:</p>
                <input type="number" value={statsB.reflexB} onChange={(e) => setStatsB((prev)=>({...prev, reflexB:parseInt(e.target.value)||0}))}/>
              
                <p>Will:</p>
                <input type="number"  value={statsB.willB} onChange={(e) => setStatsB((prev)=>({...prev, willB:parseInt(e.target.value)||0}))}/>
            </div>

            <div className='line dashed'>
              <p>Hit Points:</p>
              <input className="hp" min={0} type='number' value={statsB.healthB} onChange={(e) => setStatsB((prev)=>({...prev, healthB:parseInt(e.target.value)||0}))}/>
            </div>

            <div className='line'>
              <p>Resistance:</p>
              <input min={0} type='number' value={statsB.resistanceB} onChange={(e) => setStatsB((prev)=>({...prev, resistanceB:parseInt(e.target.value)||0}))}/>
              <p>Weakness:</p>
              <input min={0} type="number" value={statsB.weaknessB} onChange={(e) => setStatsB((prev)=>({...prev, weaknessB:parseInt(e.target.value)||0}))}/>
            </div>
          </div>



          <h2 className='chapterRed'>Offense</h2>
          <div className='section'>

            <div className='line dashed'>
              <p >Strike Bonus:</p>
              <input min={0} type='number'  value={statsB.strikeB} onChange={(e) => setStatsB((prev)=>({...prev, strikeB:parseInt(e.target.value)||0}))}/>
              <p >Strike Damage:</p>
              <input  min={1} max={4} type='number' value={statsB.damageQtB} onChange={(e)=>setStatsB((prev)=>({...prev, damageQtB:parseInt(e.target.value)||0}))}/>
              <select  value={statsB.damageDieB} onChange={(e)=>setStatsB((prev)=>({...prev, damageDieB:parseFloat(e.target.value)||0}))}>
                <option value={2.5}>d4</option>
                <option value={3.5}>d6</option>
                <option value={4.5}>d8</option>
                <option value={5.5}>d10</option>
                <option value={6.5}>d12</option>
              </select>
              <input  type='number' value={statsB.damageBonB} onChange={(e) => setStatsB((prev)=>({...prev, damageBonB:parseInt(e.target.value)||0}))}/>
            </div>

            <div className='line'>
              <div className='together'>
                <p>Spell Attack:</p>
                <input type="number" min={0} value={statsB.spellAtkB-8} onChange={(e) => setStatsB((prev)=>({...prev, spellAtkB:parseInt(e.target.value)+8||0}))}/> 
              </div>
              <div className='together'>
                <p>Spell DC:</p>
                <input type="number" min={0} value={statsB.spellDcB} onChange={(e) => setStatsB((prev)=>({...prev, spellDcB:parseInt(e.target.value)||0}))}/> 
              </div>
            </div>
            <p className='tiny dashed'>*Usually Spell DC is 8 higher than spell attack</p>
            <div className='line'>
              <p>Area Damage:</p>
              <div className='together'>
              <p>Unlimited: </p>
              <input type="checkbox" checked={statsB.unlimitedDmg} onChange={(e) => setStatsB((prev)=>({...prev, unlimitedDmg:e.target.checked}))}/> 
              </div>
              <div className='together'>
              <p>Limited: </p>
              <input type="checkbox" checked={statsB.limitedDmg} onChange={(e) => setStatsB((prev)=>({...prev, limitedDmg:e.target.checked}))}/> 
              </div>
            </div>
          </div>
        </div>


          {/*NEW STATS*/}
          <div className='card'>
            <h1 className='title titlegreen'>Scaled Stats</h1>
            <div className='line section'>
              <p>Level:</p>
              <input type="number"  value={statsN.levelN} min={-1} max={24} onChange={(e) => setStatsN((prev)=>({...prev, levelN:parseInt(e.target.value)||0}))}/>
            </div>


            <h2 className='chapterGreen'>Stats</h2>
            <div className='section'>
              <div className='line dashed'>
                <p>Perception:</p>
                <ShowNumber n={statsN.perceptionN}></ShowNumber>
              </div>
              <div className='line dashed'>
                <p>Skill:</p>
                <ShowNumber n={statsN.skillN}></ShowNumber>
              </div>
              <div className='line'>
                <p>Str:</p>
                <ShowNumber n={statsN.strengthN}></ShowNumber>
                <p>Dex:</p>
                <ShowNumber n={statsN.dexterityN}></ShowNumber>
                <p>Con:</p>
                <ShowNumber n={statsN.constitutionN}></ShowNumber>
              </div>
              <div className='line'>
                <p>Int:</p>
                <ShowNumber n={statsN.intelligenceN}></ShowNumber>
                <p>Wis:</p>
                <ShowNumber n={statsN.wisdomN}></ShowNumber>
                <p>Cha:</p>
                <ShowNumber n={statsN.charismaN}></ShowNumber>
              </div>
            </div>


            <h2 className='chapterGreen'>Defense</h2>
            <div className='section'>
              <div className='line dashed'>
                <p>AC:</p>
                <p className='newStat'>{statsN.armorN}</p>
                <p>Fort:</p>
                <ShowNumber n={statsN.fortitudeN}></ShowNumber>
                <p>Ref:</p>
                <ShowNumber n={statsN.reflexN}></ShowNumber>
                <p>Will:</p>
                <ShowNumber n={statsN.willN}></ShowNumber>
              </div>
              <div className='line dashed'>
                <p>Hit Points:</p>
                <p className='newStat'>{statsN.healthN}</p>
              </div>
                <div className='line'>
                <p>Resistance:</p>
                <p className='newStat'>{statsN.resistanceN}</p>
                <p>Weakness:</p>
                <p className='newStat'>{statsN.weaknessN}</p>
              </div>
            </div>


            <h2 className='chapterGreen'>Offense</h2> 
            <div className='section'>
              <div className='line dashed'>
                <p>Strike Bonus:</p>
                <p className='newStat'>+{statsN.strikeN}</p>
                <p>Strike Bonus:</p>
                <p className='newStat'>+{statsN.damageN}</p>
              </div>

              <div className='line dashed'>
                <p>Spell Strike:</p>
                <ShowNumber n={statsN.spellAtkN}></ShowNumber>
                <p>Spell DC:</p>
                <p className='newStat'>{statsN.spellDcN}</p>
              </div>

              <div className='line'>
                <p>Area Damage:</p>
                <div className='line'>
                  <p>Unlimited:</p>
                  <p className='newStat'>{statsN.unlimitedDmg}</p>
                </div>
                <div className='line'>
                  <p>Limited:</p>
                  <p className='newStat'>{statsN.limitedDmg}</p>
                </div>
              </div>
            </div>
            <div className='end'></div>
          </div>
        </div>
    </div>
  )
}




export default App
