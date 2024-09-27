// global.d.ts
declare global {
    namespace NodeJS {
        interface Process {
            pkg: boolean;
        }
    }
}

// declare let process: {
//     pkg: boolean;
// };

export {};
