export {};
// import { Box, Button, CssBaseline, ThemeProvider } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from 'react-router-dom';
// import theme from '../../theme/theme';
// import TopNavigation from "../../components/TopNavigation";
// import { v4 as uuidv4 } from 'uuid';
// import DashboardController from "../../controllers/dashboard/dashboard.controller";
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import FlashCard from "../../components/flashcard";
// import EndGame from "../../components/EndGame";

// // const steps = [
// //     {
// //         key: 'item1',
// //         image_url: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
// //         translation: 'いぬ'
// //     },
// //     {
// //         key: 'item2',
// //         image_url: 'https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
// //         translation: 'ねこ'
// //     }
// // ]

// export default function PracticeScreen(props: any) {
//     const [activeStep, setActiveStep] = React.useState<number>(0);
//     const [skipped, setSkipped] = React.useState(new Set<number>());
//     const navigate = useNavigate();
//     const { userID } = useParams();
//     const [gameID, setGameID] = useState(uuidv4());
//     const [steps, setSteps] = useState<any[]>([]);
//     const [score, setScore] = useState(0);
//     const [attempted, setAttempted] = useState<any | number>(null);
//     const [options, setOptions] = useState<any[]>([]);
//     const [loaded, setLoaded] = useState(false);

//     const getList = () => {
//         DashboardController.getLists().then((OpenAPIResponse) => {
//             if (OpenAPIResponse.status === 200) {
//                 const response = OpenAPIResponse.data.default_list.objects.slice(0, 10);
//                 // DashboardController.getList(OpenAPIResponse.data.default_list.id!).then((finalResponse) => {
//                 //     if (finalResponse.status == 200) {
//                 //         console.log(finalResponse)
//                 //     }
//                 // })
//                 setSteps(response);
//                 // console.log(response);
//                 return response;
//             }
//         })
//     }

//     const createOptions = async () => {
//         var created_options: any[] = [];
//         for (let i = 0; i < steps.length; i++) {
//             // console.log("Im in")
//             const choices: any[] = [];
//             // two options
//             const index = Math.floor(Math.random() * 2);

//             // get secondary random option
//             var random = Math.floor(Math.random() * steps.length)
//             // if other option is same as the current index we change it to next by default
//             if (random === i) {
//                 if (random === (steps.length - 1)) {
//                     random = 0;
//                 } else {
//                     random = i + 1;
//                 }
//             }

//             // get translation in given language
//             // TODO: change to props.language
//             // var correctTranslation: any[] = targets.filter(target => {
//             //     return target.language === 'ja'
//             // })
//             // var incorrectTranslation: any[] = targets.filter(target => {
//             //     return target.language === 'ja'
//             // })
//             choices[index] = await steps[i].target[0].text;
//             choices[1 - index] = await steps[i].target[0].text;
//             const option = {
//                 'correctIndex': index,
//                 'language': steps[i].target[0].language,
//                 'options': choices,
//                 'step': i,
//             }
//             created_options[i] = option;
//         }
//         // console.log(created_options);
//         setOptions(created_options);
//         return created_options;
//     }

//     useEffect(() => {
//         getList();
//         // console.log(steps)
//     }, [])

//     useEffect(() => {
//         steps.length && createOptions();
//         setLoaded(true)
//     }, [steps])

//     const isStepOptional = (step: number) => {
//         return step !== attempted;
//     };

//     const isNextPossible = (step: number) => {
//         return step === attempted;
//     };
//     const isStepSkipped = (step: number) => {
//         return skipped.has(step);
//     };

//     const handleNext = () => {
//         let newSkipped = skipped;
//         if (isStepSkipped(activeStep)) {
//             newSkipped = new Set(newSkipped.values());
//             newSkipped.delete(activeStep);
//         }
//         setAttempted(false);
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//         setSkipped(newSkipped);

//     };

//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };

//     const handleSkip = () => {
//         if (!isStepOptional(activeStep)) {
//             // You probably want to guard against something like this,
//             // it should never occur unless someone's actively trying to break something.
//             throw new Error("You can't skip a step that isn't optional.");
//         }
//         setAttempted(false);
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//         setSkipped((prevSkipped) => {
//             const newSkipped = new Set(prevSkipped.values());
//             newSkipped.add(activeStep);
//             return newSkipped;
//         });

//     };

//     const handleEnd = () => {
//         // setActiveStep(0);
//         navigate(`/dashboard/${userID}`, { state: { uid: userID } });

//     };

//     return (
//         <ThemeProvider theme={theme}>
//             <TopNavigation />
//             {/* <Grid container component="main" direction="column" alignContent="center" sx={{ bgcolor: 'primary.light' }}> */}
//             <CssBaseline />
//             {(loaded) ?
//                 <Box sx={{ width: '100%', marginTop: 4 }}>
//                     <Stepper activeStep={activeStep} sx={{
//                         width: '100%', ".MuiStep-root": {
//                             paddingLeft: 0
//                         }
//                     }} >
//                         {
//                             steps.map((label, index) => {
//                                 const stepProps: { completed?: boolean } = {};
//                                 const labelProps: {
//                                     optional?: React.ReactNode;
//                                 } = {};
//                                 if (isStepSkipped(index)) {
//                                     stepProps.completed = false;
//                                 }
//                                 return (
//                                     <Step key={index} {...stepProps} sx={{

//                                     }}>
//                                         <StepLabel {...labelProps} ></StepLabel>
//                                     </Step>
//                                 );
//                             })
//                         }
//                     </Stepper>
//                     {activeStep === steps.length ? (
//                         <React.Fragment>
//                             {/* <Typography sx={{ mt: 2, mb: 1 }}>
//                                 All steps completed - you&apos;re finished
//                             </Typography> */}
//                             <EndGame points={score} practice={true} />
//                             <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//                                 <Box sx={{ flex: '1 1 auto' }} />
//                                 <Button onClick={handleEnd}>End Game</Button>
//                             </Box>
//                         </React.Fragment>
//                     ) : (
//                         <React.Fragment>
//                             {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
//                             <Box sx={{ display: 'flex', flexDirection: 'column', m: 2, alignItems: 'center' }}>
//                                 <FlashCard image_url={steps[activeStep].image_url} options={options[activeStep]} settingScore={setScore} settingAttempted={setAttempted} />
//                             </Box>
//                             <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//                                 {/* <Button
//                                     color="inherit"
//                                     disabled={activeStep === 0}
//                                     onClick={handleBack}
//                                     sx={{ mr: 1 }}
//                                 >
//                                     Back
//                                 </Button> */}
//                                 <Box sx={{ flex: '1 1 auto' }} />
//                                 {isStepOptional(activeStep) && (
//                                     <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
//                                         Skip
//                                     </Button>
//                                 )}
//                                 {isNextPossible(activeStep) && (
//                                     <Button onClick={handleNext}>
//                                         {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//                                     </Button>)}
//                             </Box>
//                         </React.Fragment>
//                     )}
//                 </Box>
//                 : null}
//         </ThemeProvider >
//     );
// }
