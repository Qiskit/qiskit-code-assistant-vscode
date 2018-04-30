from IBMQuantumExperience import IBMQuantumExperience
import argparse

def main():
    parser = argparse.ArgumentParser()

    parser.add_argument('--apiToken')
    parser.add_argument('--url', nargs='?', default='https://quantumexperience.ng.bluemix.net/api')
    parser.add_argument('--hub', nargs='?', default=None)
    parser.add_argument('--group', nargs='?', default=None)
    parser.add_argument('--project', nargs='?', default=None)
    
    args = vars(parser.parse_args())

    if (args['url'] is None):
        args['url'] = 'https://quantumexperience.ng.bluemix.net/api' 

    if (args['hub'] is None) or (args['group'] is None) or (args['project'] is None):
        api = IBMQuantumExperience(args['apiToken'], {'url': args['url']})
    else:
        api = IBMQuantumExperience(args['apiToken'], {'url': args['url'], 'hub': args['hub'], 'group': args['group'], 'project': args['project']})

    print(str(api.get_my_credits()))

if __name__ == '__main__':
    main()